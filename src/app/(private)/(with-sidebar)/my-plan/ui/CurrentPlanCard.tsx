export default function CurrentPlanCard() {
  return (
    <div className="border-2 border-[#1195FF] rounded-xl p-4 mb-6">
      <h3 className="font-semibold text-sm mb-2">PLANO EMPRESA</h3>
      <p className="text-gray-700 text-sm mb-4">
        Plano focado em empresas pequenas ou grandes, cadastro ilimitado de colaboradores e serviços. Cancele quando quiser.
      </p>
      <div className="flex justify-between items-center">
        <span className="font-semibold text-sm">Mensal: R$ 39,90</span>
        <button className="bg-[#1195FF] text-white px-5 py-2 rounded-md text-sm font-semibold" disabled>
          SEU PLANO
        </button>
      </div>
    </div>
  );
}
