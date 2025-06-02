export default function PixPayment() {
  return (
    <div className="text-center py-12">
      <p className="mb-4 text-gray-700">Escaneie o QR Code abaixo para finalizar o pagamento:</p>
      <img
        src="/qrcode-pix.png"
        alt="QR Code Pix"
        className="mx-auto h-48 w-48 border border-gray-200 p-2 rounded-md"
      />
      <p className="mt-4 text-sm text-gray-500">Após o pagamento, você será redirecionado automaticamente.</p>
    </div>
  );
}
