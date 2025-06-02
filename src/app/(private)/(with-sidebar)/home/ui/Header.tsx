import Header from '@/componentes/Header';

export default function HomeHeader() {
  return (
    <div className="sticky top-0 z-30 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Header />
        </div>
      </div>
    </div>
  );
}
