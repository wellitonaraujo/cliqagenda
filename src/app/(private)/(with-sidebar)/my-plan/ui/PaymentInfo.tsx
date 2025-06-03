type Props = {
  number: string;
  validity: string;
  paymentDate: string | number;
};

export default function PaymentInfo({ number, validity, paymentDate }: Props) {
  const formatNextChargeDate = (rawDate: string | number) => {
    const date = typeof rawDate === 'number' ? new Date(rawDate * 1000) : new Date(rawDate);

    if (isNaN(date.getTime())) return 'Data inválida';

    date.setDate(date.getDate() + 30);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <img src="/visa.svg" alt="Visa" className="w-10 h-auto" />
        <span className="text-sm text-gray-800">••• {number.slice(-4)}</span>
        <span className="text-sm text-gray-600">| {validity}</span>
      </div>

      <p className="text-sm text-gray-700 mb-4">
        Próxima cobrança: <strong>{formatNextChargeDate(paymentDate)}</strong>
      </p>
    </>
  );
}
