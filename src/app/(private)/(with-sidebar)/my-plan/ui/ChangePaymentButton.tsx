type Props = {
  onClick?: () => void;
};

export default function ChangePaymentButton({ onClick }: Props) {
  return (
    <>
      <p className="text-sm font-semibold text-gray-800 mt-6">
        Deseja mudar método de pagamento?
      </p>
      <button
        className="border-2 border-[#1195FF] text-[#1195FF] font-medium px-4 py-3 mt-2 rounded-md w-full"
        onClick={onClick}
      >
        Alterar método de pagamento
      </button>
    </>
  );
}
