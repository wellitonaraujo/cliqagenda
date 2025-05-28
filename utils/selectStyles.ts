export const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: 50,
    borderColor: state.isFocused ? '#00AEEF' : base.borderColor,
    boxShadow: state.isFocused ? '0 0 0 1px #00AEEF' : base.boxShadow,
    '&:hover': {
      borderColor: state.isFocused ? '#00AEEF' : base.borderColor,
    },
  }),
  valueContainer: (base: any) => ({
    ...base,
    paddingTop: 4,
    paddingBottom: 4,
  }),
};
