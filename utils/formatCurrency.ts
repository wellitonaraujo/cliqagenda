export const formatCurrency = (value: string) => {
    const numeric = value.replace(/\D/g, '');
    const number = parseFloat(numeric) / 100;
  
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
  