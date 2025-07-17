import type { FieldRule } from "../types/types";

export const parseMessage = (message: string | null | undefined): string => {
  if (!message) return "";
  try {
    const parsed = JSON.parse(message);
    return parsed.message || message;
  } catch {
    return message || "";
  }
};

export const getUrlParams = (): Record<string, string> => {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};

export const validateField = (
  value: any,
  rules: FieldRule | undefined
): string | undefined => {
  if (!rules) return undefined;

  if (rules.required && (!value || value.toString().trim() === "")) {
    return "This field is required";
  }

  if (value && rules.minLength && value.toString().length < rules.minLength) {
    return `Minimum length is ${rules.minLength}`;
  }

  if (value && rules.maxLength && value.toString().length > rules.maxLength) {
    return `Maximum length is ${rules.maxLength}`;
  }

  if (value && rules.pattern) {
    const regex = new RegExp(rules.pattern.regexp);
    if (!regex.test(value.toString())) {
      return parseMessage(rules.pattern.message);
    }
  }

  return undefined;
};