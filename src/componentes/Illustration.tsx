import Image from 'next/image';

export default function Illustration() {
  return (
    <div className="flex items-center justify-center">
      <Image src="/illustrator.svg" alt="Ilustração" width={200} height={200} />
    </div>
  );
}
