'use client';

import dynamic from 'next/dynamic';
const ReactSelect = dynamic(() => import('react-select'), { ssr: false });

const Select = (props: any) => (
  <ReactSelect instanceId={props.name || 'default-select'} {...props} />
);

export default Select;
