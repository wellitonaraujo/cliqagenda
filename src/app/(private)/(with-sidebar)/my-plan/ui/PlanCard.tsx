type Props = {
  type: 'trial' | 'business';
  active: boolean;
  onClick: () => void;
  onSubscribe?: () => void;
};

export default function PlanCard({ type, active, onClick, onSubscribe }: Props) {
  const isTrial = type === 'trial';

  return (
    <div
      onClick={onClick}
      className={`border-2 rounded-xl p-4 mb-4 cursor-pointer transition-all ${
        active ? 'border-[#1195FF]' : 'border-gray-200'
      }`}
    >
      {isTrial ? (
        <>
          <div className="flex justify-between items-center mb-2">
            <span className="bg-[#1195FF] text-white font-bold px-4 py-1 rounded-md text-sm">SEU PLANO</span>
            <span className="font-semibold text-sm">Teste de 14 dias grátis</span>
          </div>
          <p className="text-gray-700 text-sm mb-2">Plano de avaliação gratuita, sem nenhuma cobrança.</p>
          <p className="text-gray-700 text-sm">
            Após o período, o acesso será <strong>bloqueado</strong> caso não haja escolha de um plano de assinatura.
          </p>
        </>
      ) : (
        <>
          <h3 className="font-semibold text-sm mb-2">PLANO EMPRESA</h3>
          <p className="text-gray-700 text-sm mb-4">
            Plano focado em empresas pequenas ou grandes, cadastro ilimitado de colaboradores e serviços. Cancele quando quiser.
          </p>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm">Mensal: R$ 39,90</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSubscribe?.();
              }}
              className="bg-[#1195FF] text-white px-5 py-2 rounded-md text-sm font-semibold"
            >
              ASSINAR
            </button>
          </div>
        </>
      )}
    </div>
  );
}
