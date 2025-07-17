import type { Field } from "../types/types";
import { CaptchaInput } from "./fields/CaptchaInput";
import { CheckboxInput } from "./fields/CheckboxInput";
import { OtpInput } from "./fields/OtpInput";
import { SelectInput } from "./fields/SelectInput";
import { TextInput } from "./fields/TextInput";

export const FieldFactory: React.FC<{
  field: Field;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}> = ({ field, value, onChange, error }) => {
  switch (field.type) {
    case "text":
    case "email":
    case "password":
      return (
        <TextInput
          field={field}
          value={value}
          onChange={onChange}
          error={error}
        />
      );
    case "select":
      return (
        <SelectInput
          field={field}
          value={value || ""}
          onChange={onChange}
          error={error}
        />
      );
    case "checkbox":
      return (
        <CheckboxInput
          field={field}
          value={value || ""}
          onChange={onChange}
          error={error}
        />
      );
    case "captcha":
      return (
        <CaptchaInput
          field={field}
          value={value || ""}
          onChange={onChange}
          error={error}
        />
      );
    case "otp":
      return (
        <OtpInput
          field={field}
          value={value || ""}
          onChange={onChange}
          error={error}
        />
      );
    default:
      return null;
  }
};