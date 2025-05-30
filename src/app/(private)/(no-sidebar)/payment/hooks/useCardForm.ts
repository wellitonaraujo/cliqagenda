'use client';

import { useState } from 'react';

export function useCardForm() {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    validity: '',
    cvv: '',
    document: '',
    email: '',
  });

  const formatCardNumber = (value: string) =>
    value
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim();

  const formatValidity = (value: string) =>
    value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d{1,2})/, '$1/$2')
      .slice(0, 5);

  const formatCVV = (value: string) =>
    value.replace(/\D/g, '').slice(0, 4);

  const formatDocument = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 11) {
      return digits
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      return digits
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    let formattedValue = value;

    switch (name) {
      case 'number':
        formattedValue = formatCardNumber(value);
        break;
      case 'validity':
        formattedValue = formatValidity(value);
        break;
      case 'cvv':
        formattedValue = formatCVV(value);
        break;
      case 'document':
        formattedValue = formatDocument(value);
        break;
      default:
        formattedValue = value;
    }

    setCardData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  }

  return {
    cardData,
    handleChange,
    setCardData,
  };
}
