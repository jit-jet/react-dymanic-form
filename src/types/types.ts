export type FieldRule = {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  readOnly?: boolean;
  pattern?: {
    regexp: string;
    message: string;
  };
  method?: string;
}

export type Field = {
  type: string;
  caption?: string;
  hint?: string;
  name: string;
  value?: string;
  dir?: string;
  placeholder?: string;
  rules?: FieldRule;
  sort?: number;
  options?: Record<string, string>;
  param?: string;
  inline?: boolean;
  condition?: {
    field: string;
    value: string | string[];
    operator?: "equals" | "not_equals" | "contains" | "in";
  };
}

export type FormStep = {
  name: string;
  method: string;
  action?: string;
  title?: string;
  description?: string;
  hideFields?: string[];
  fields: Field[];
  back?: boolean;
  params?: string[];
  payload?: any[];
  data?: any;
}

export type FormConfig = {
  form: {
    register: FormStep[];
  };
}