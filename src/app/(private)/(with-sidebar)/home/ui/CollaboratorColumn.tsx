import Image from "next/image";

interface Props {
  nome: string;
  fotoUrl?: string;
  count: number;
}

export default function CollaboratorHeaderColumn({ nome, fotoUrl = "/image.png", count }: Props) {
  return (
    <div className="min-w-[220px] h-[40px] flex items-center justify-between px-3 bg-gray-50 text-xs font-medium text-gray-500">
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-400">
          <Image
            src={fotoUrl}
            alt="foto de perfil"
            width={40}
            height={40}
            className="w-full h-full"
          />
        </div>
        <span className="truncate max-w-[110px] text-[#5C5C5C]">{nome}</span>
      </div>
      <div className="w-6 h-6 min-w-6 min-h-6 rounded-full text-[#5C5C5C] text-[12px] flex items-center justify-center">
        <span></span>{count}
      </div>
    </div>
  );
}
