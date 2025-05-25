import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface DateNavigatorProps {
  selectedDate: Date;
  onDateChange: (days: number) => void;
}

export default function DateNavigator({ selectedDate, onDateChange }: DateNavigatorProps) {
  return (
    <div className="flex items-center gap-2 text-primary font-medium">
      <button
        onClick={() => onDateChange(-1)}
        className="h-10 w-10 flex items-center justify-center border text-gray-400 border-gray-200 bg-gray-50 rounded-md"
      >
        <FiChevronLeft size={20} />
      </button>

      <span className="h-10 flex text-[#034D82] items-center justify-center border border-gray-200 bg-gray-50 px-4 rounded-md text-sm font-medium">
        {selectedDate.toLocaleDateString('pt-BR')}
      </span>

      <button
        onClick={() => onDateChange(1)}
        className="h-10 w-10 flex items-center justify-center border text-gray-400 border-gray-200 bg-gray-50 rounded-md"
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  );
}
