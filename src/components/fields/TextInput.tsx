import { useState } from "react";
import type { Field } from "../../types/types";
import { parseMessage } from "../../utility/utilitis";
import { Eye, EyeOff } from "lucide-react";

export const TextInput: React.FC<{
  field: Field;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}> = ({ field, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = field.type === "password";

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {parseMessage(field.name)}
         {field.rules?.required && <span className=" text-yellow-500"> * </span>}
      </label>
      <div className="relative">
        <input
          name={field.name + field.type}
          type={isPassword && !showPassword ? "password" : "text"}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={parseMessage(field.placeholder)}
          dir={field.dir || "ltr"}
          readOnly={field.rules?.readOnly}
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
            error ? "border-red-500" : "border-gray-600"
          } ${field.rules?.readOnly ? "opacity-50 cursor-not-allowed" : ""}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {field.hint && (
        <p className="text-sm text-gray-400">{parseMessage(field.hint)}</p>
      )}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};