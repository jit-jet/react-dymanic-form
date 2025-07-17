import { useState } from "react";
import type { Field } from "../../types/types";
import { parseMessage } from "../../utility/utilitis";

export const CaptchaInput: React.FC<{
  field: Field;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}> = ({ field, value, onChange, error }) => {
  const [captchaCode, setCaptchaCode] = useState("ABCD123");

  const refreshCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {parseMessage(field.name)}
        {field.rules?.required && <span className=" text-yellow-500"> * </span>}
      </label>
      <div className="flex space-x-3">
        <div className="flex-1">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={parseMessage(field.placeholder)}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
              error ? "border-red-500" : "border-gray-600"
            }`}
          />
        </div>
        <div className="flex items-center space-x-2">
          <div className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg font-mono text-yellow-400 select-none">
            {captchaCode}
          </div>
          <button
            type="button"
            onClick={refreshCaptcha}
            className="px-3 py-3 bg-yellow-600 hover:bg-yellow-700 text-black rounded-lg transition-colors"
          >
            ↻
          </button>
        </div>
      </div>
      {field.hint && (
        <p className="text-sm text-gray-400">{parseMessage(field.hint)}</p>
      )}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};