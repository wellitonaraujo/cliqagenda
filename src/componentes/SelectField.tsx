'use client';

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Option } from '../../utils/durationOptions';
import clsx from 'clsx';

interface Props {
  label: string;
  options: Option[];
  value: Option | null;
  onChange: (option: Option) => void;
  placeholder?: string;
  isDisabled?: boolean;
  noOptionsMessage?: string;
}

export default function SelectField({
  label,
  options,
  value,
  onChange,
  placeholder = 'Selecione...',
  isDisabled = false,
}: Props) {
  return (
    <div className="relative">
      <label className="block text-gray-700 text-sm mb-1">{label}</label>

      <Listbox value={value} onChange={onChange} by="value" disabled={isDisabled}>
        <div className="relative">
          <ListboxButton className="relative w-full cursor-default rounded border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-[#00AEEF] focus:outline-none focus:ring-1 focus:ring-[#00AEEF] sm:text-sm min-h-[50px]">
            <span className="block truncate">{value?.label || placeholder}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </span>
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((opt) => (
              <ListboxOption
                key={opt.value}
                value={opt}
                className={({ active }) =>
                  clsx(
                    'cursor-pointer select-none relative py-2 pl-10 pr-4',
                    active ? 'bg-[#E6F7FB] text-black' : 'text-gray-900'
                  )
                }
              >
                {({ selected }) => (
                  <>
                    <span className={clsx('block truncate', selected && 'font-medium')}>
                      {opt.label}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#00AEEF]">
                        <CheckIcon className="h-5 w-5" />
                      </span>
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
