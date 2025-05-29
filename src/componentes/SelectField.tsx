import Select, { SingleValue } from 'react-select';

interface Option {
  value: number | string;
  label: string | number;
}

interface SelectFieldProps {
  label: string;
  options: Option[];
  value: Option | null;
  onChange: (option: SingleValue<Option>) => void;
  placeholder?: string;
  isDisabled?: boolean;
  noOptionsMessage?: () => string;
}

export function SelectField({
  label,
  options,
  value,
  onChange,
  placeholder = '',
  isDisabled = false,
  noOptionsMessage,
}: SelectFieldProps) {
  return (
    <div>
      <label className="block text-gray-700 text-sm mb-1">{label}</label>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        noOptionsMessage={noOptionsMessage}
        placeholder={placeholder}
        isDisabled={isDisabled}
        classNamePrefix="custom-select"
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: 50,
            borderColor: state.isFocused ? '#00AEEF' : base.borderColor,
            boxShadow: state.isFocused ? '0 0 0 1px #00AEEF' : base.boxShadow,
            '&:hover': {
              borderColor: state.isFocused ? '#00AEEF' : base.borderColor,
            },
          }),
          valueContainer: (base) => ({
            ...base,
            paddingTop: 4,
            paddingBottom: 4,
          }),
        }}
      />
    </div>
  );
}
