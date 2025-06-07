'use client';

import dynamic from 'next/dynamic';
import type { Props as ReactSelectProps } from 'react-select';

const ReactSelect = dynamic(() => import('react-select'), { ssr: false });

const Select = (props: ReactSelectProps) => (
  <ReactSelect instanceId={props.name || 'default-select'} {...props} />
);

export default Select;
