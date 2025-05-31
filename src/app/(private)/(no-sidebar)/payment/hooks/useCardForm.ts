import { useState } from 'react';
import { isValidCPF } from '../../../../../../utils/isValidCPF';
import { isValidCNPJ } from '../../../../../../utils/isValidCNPJ';

export function useCardForm() {
  const [errors, setErrors] = useState<{ validity?: string; document?: string }>({});
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    validity: '',
    cvv: '',
    document: '',
    email: '',
  });

  const formatCardNumber = (value: string) =>
    value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ').trim();

  const formatValidity = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    const formatted = digits.replace(/^(\d{2})(\d{1,2})/, '$1/$2');

    if (digits.length >= 2) {
      const month = parseInt(digits.slice(0, 2), 10);
      if (month < 1 || month > 12) {
        setErrors((prev) => ({ ...prev, validity: 'Validade inválida' }));
      } else {
        setErrors((prev) => ({ ...prev, validity: undefined }));
      }
    } else {
      setErrors((prev) => ({ ...prev, validity: undefined }));
    }

    return formatted.slice(0, 5);
  };

  const formatCVV = (value: string) => value.replace(/\D/g, '').slice(0, 4);

  const formatDocument = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 14);

    let formatted = digits;
    if (digits.length <= 11) {
      formatted = digits
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

      const valid = isValidCPF(digits);
      setErrors((prev) => ({ ...prev, document: valid ? undefined : 'CPF inválido' }));
    } else {
      formatted = digits
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');

      const valid = isValidCNPJ(digits);
      setErrors((prev) => ({ ...prev, document: valid ? undefined : 'CNPJ inválido' }));
    }

    return formatted;
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
    errors,
  };
}
