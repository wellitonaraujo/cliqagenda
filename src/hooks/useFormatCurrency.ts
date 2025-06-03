export function useFormatCurrency() {
  return (value: number) =>
    (value / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
}