type Props = {
  number: string;
  validity: string;
};

export default function PaymentInfo({ number, validity }: Props) {
 const formatDate = (raw: string) => {
  if (!raw.includes('/')) return 'Data inválida';

  const [month, year] = raw.split('/');

  const normalizedMonth = month.padStart(2, '0');
  const normalizedYear = year.length === 2 ? `20${year}` : year;

  if (!/^\d{2}$/.test(normalizedMonth) || !/^\d{4}$/.test(normalizedYear)) {
    return 'Data inválida';
  }

  return `01/${normalizedMonth}/${normalizedYear}`;
};


  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <img src="/visa.svg" alt="Visa" className="w-10 h-auto" />
        <span className="text-sm text-gray-800">••• {number.slice(-4)}</span>
        <span className="text-sm text-gray-600">| {validity}</span>
      </div>

      <p className="text-sm text-gray-700 mb-4">
        Próxima cobrança: <strong>{formatDate(validity)}</strong>
      </p>
    </>
  );
}
