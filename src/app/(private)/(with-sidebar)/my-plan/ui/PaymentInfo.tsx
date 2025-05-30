type Props = {
  number: string;
  validity: string;
};

export default function PaymentInfo({ number, validity }: Props) {
  const formatDate = (raw: string) => {
    const [month, year] = raw.split('/');
    return `01/${month}/${year}`;
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
