type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
};

export function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
}: InputFieldProps) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium mb-1">
        {label}<span className="text-red-500">*</span>
      </label>
      <input
        name={name}
        type="text"
        className="w-full border rounded-md p-2 text-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <p className={`text-xs mt-1 min-h-[1rem] ${error ? 'text-red-500' : 'text-transparent'}`}>
        {error || `${label} inválido`}
      </p>
    </div>
  );
}
