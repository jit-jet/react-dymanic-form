import type { Field } from "../../types/types";
import { parseMessage } from "../../utility/utilitis";

export  const CheckboxInput: React.FC<{
  field: Field;
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string;
}> = ({ field, value, onChange, error }) => {
  return (
    <div className="space-y-2">
      <label className="flex items-center space-x-3 cursor-pointer">
        <input
          type="checkbox"
          checked={value || false}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 text-yellow-500 bg-gray-800 border-gray-600 rounded"
        />
        <div
          dangerouslySetInnerHTML={{
            __html: parseMessage(field.caption || field.placeholder),
          }}
          className="text-sm text-gray-300"
        >
        </div>
      </label>
      {field.hint && (
        <p className="text-sm text-gray-400">{parseMessage(field.hint)}</p>
      )}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};