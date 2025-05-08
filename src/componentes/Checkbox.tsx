type CheckboxProps = {
    label: string
  }
  
  export default function Checkbox({ label }: CheckboxProps) {
    return (
      <label className="flex items-center space-x-2">
        <input type="checkbox" className="accent-primary" />
        <span className="text-sm font-medium">{label}</span>
      </label>
    )
  }
  