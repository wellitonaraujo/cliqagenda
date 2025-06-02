export function formatTelefone(value: string): string {
  if (value.length <= 2) {
    return `(${value}`;
  }
  if (value.length <= 7) {
    return `(${value.slice(0, 2)}) ${value.slice(2)}`;
  }
  return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
}
