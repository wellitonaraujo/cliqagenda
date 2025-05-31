type Props = {
  cardData: any;
  errors: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function CardForm({ cardData, errors, onChange, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="rounded-xl space-y-4 w-full max-w-xl mx-auto bg-white">
      <div className="flex items-center space-x-3">
        <img src="/visa.svg" alt="Visa" className="h-6" />
        <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
      </div>

      {/* Número */}
      <Input label="Número" name="number" value={cardData.number} onChange={onChange} placeholder="0000.0000.0000.0000" />
      {/* Nome */}
      <Input label="Titular" name="name" value={cardData.name} onChange={onChange} placeholder="Nome do titular" />

      <div className="flex flex-col sm:flex-row gap-2">
        <Input label="Validade" name="validity" value={cardData.validity} onChange={onChange} placeholder="MM/AA" error={errors.validity} />
        <Input label="CVV" name="cvv" value={cardData.cvv} onChange={onChange} placeholder="123" />
      </div>

      <Input label="CPF/CNPJ" name="document" value={cardData.document} onChange={onChange} error={errors.document} />
      <Input label="Email" name="email" value={cardData.email} onChange={onChange} placeholder="email@example.com" />

      <button
        type="submit"
        className="w-full bg-[#1195FF] hover:bg-[#1194ffd1] text-white py-2 rounded-md text-sm font-semibold transition"
      >
        Realizar pagamento
      </button>

        <p className="text-xs text-gray-500 text-center mt-6 max-w-xl mx-auto">
          Sua assinatura será renovada automaticamente mês a mês até o cancelamento.
        </p>
    </form>
  );
}

function Input({ label, name, value, onChange, placeholder, error }: any) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium mb-1">
        {label}<span className="text-red-500">*</span>
      </label>
      <input
        name={name}
        type="text"
        className="w-full border rounded-md p-2 text-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error !== undefined && (
        <p className={`text-xs mt-1 min-h-[1rem] ${error ? 'text-red-500' : 'text-transparent'}`}>
          {error || `${label} inválido`}
        </p>
      )}
    </div>
  );
}
