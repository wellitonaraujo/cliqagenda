export function normalizeDayName(shortName: string) {
    if (shortName.startsWith("seg")) return "Segunda";
    if (shortName.startsWith("ter")) return "Terça";
    if (shortName.startsWith("qua")) return "Quarta";
    if (shortName.startsWith("qui")) return "Quinta";
    if (shortName.startsWith("sex")) return "Sexta";
    if (shortName.startsWith("sáb")) return "Sábado";
    if (shortName.startsWith("dom")) return "Domingo";
    return "";
  }
  