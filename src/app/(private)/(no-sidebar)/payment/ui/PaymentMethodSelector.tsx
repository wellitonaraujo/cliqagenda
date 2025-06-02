type Props = {
  selected: 'card' | 'pix';
  onSelect: (method: 'card' | 'pix') => void;
};

export default function PaymentMethodSelector({ selected, onSelect }: Props) {
  return (
    <div className="flex justify-center gap-4 mb-6">
      {['card', 'pix'].map(method => (
        <button
          key={method}
          onClick={() => onSelect(method as 'card' | 'pix')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            selected === method ? 'bg-[#1195FF] text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          {method === 'card' ? 'Cartão' : 'Pix'}
        </button>
      ))}
    </div>
  );
}
