export const customSelectStyles = {
  classNames: {
    control: () =>
      'border border-gray-300 rounded-lg shadow-sm bg-white px-2 py-1 hover:border-gray-400',
    menu: () => 'bg-white border border-gray-200 mt-1 rounded-md shadow-lg',
    option: ({ isFocused, isSelected }: { isFocused: boolean; isSelected: boolean }) =>
      `px-4 py-2 cursor-pointer ${
        isSelected
          ? 'bg-purple-500 text-white'
          : isFocused
          ? 'bg-purple-100 text-purple-800'
          : 'text-gray-700'
      }`,
    multiValue: () =>
      'bg-purple-100 text-purple-800 rounded px-2 py-0.5 text-sm flex items-center',
    multiValueRemove: () => 'text-purple-500 hover:text-purple-700 ml-1 cursor-pointer',
    placeholder: () => 'text-gray-400',
    singleValue: () => 'text-gray-800',
    input: () => 'text-gray-800',
  },
};
