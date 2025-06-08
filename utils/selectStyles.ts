import type { StylesConfig, ControlProps, GroupBase } from 'react-select';

interface Option {
  value: string | number;
  label: string;
}

export const selectStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  control: (base, state: ControlProps<Option, false>) => ({
    ...base,
    minHeight: 50,
    borderColor: state.isFocused ? '#1195FF' : base.borderColor,
    boxShadow: state.isFocused ? '0 0 0 1px #1195FF' : base.boxShadow,
    '&:hover': {
      borderColor: state.isFocused ? '#1195FF' : base.borderColor,
    },
  }),
  valueContainer: (base) => ({
    ...base,
    paddingTop: 4,
    paddingBottom: 4,
  }),
};
