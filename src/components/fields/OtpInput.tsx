import { useState } from "react";
import type { Field } from "../../types/types";
import { parseMessage } from "../../utility/utilitis";

export const OtpInput: React.FC<{
  field: Field;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}> = ({ field, value, onChange, error }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const sendOtp = () => {
    setOtpSent(true);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="space-y-2">
      {field.caption && (
        <label className="block text-sm font-medium text-gray-300">
          {parseMessage(field.caption)}
        </label>
      )}
      <div className="flex space-x-3">
        <div className="flex-1">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={parseMessage(field.placeholder)}
            maxLength={6}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
              error ? "border-red-500" : "border-gray-600"
            }`}
          />
        </div>
        <button
          type="button"
          onClick={sendOtp}
          disabled={countdown > 0}
          className="px-4 py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-black disabled:text-gray-400 rounded-lg transition-colors whitespace-nowrap"
        >
          {countdown > 0 ? `${countdown}s` : otpSent ? "Resend" : "Send OTP"}
        </button>
      </div>
      {field.hint && (
        <p className="text-sm text-gray-400">{parseMessage(field.hint)}</p>
      )}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};