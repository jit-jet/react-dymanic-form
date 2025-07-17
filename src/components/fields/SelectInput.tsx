import type { Field } from "../../types/types";
import { parseMessage } from "../../utility/utilitis";

export const SelectInput: React.FC<{
  field: Field;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}> = ({ field, value, onChange, error }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {parseMessage(field.name)}
         {field.rules?.required && <span className=" text-yellow-500"> * </span>}
      </label>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        dir={field.dir || "ltr"}
        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
          error ? "border-red-500" : "border-gray-600"
        }`}
      >
        <option value="">{parseMessage(field.placeholder)}</option>
        {field.options &&
          Object.entries(field.options).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
      </select>
      {field.hint && (
        <p className="text-sm text-gray-400">{parseMessage(field.hint)}</p>
      )}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};
