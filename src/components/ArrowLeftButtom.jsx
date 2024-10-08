import { ChevronLeft } from "lucide-react";

export default function ArrowLeftButton({handleReturn, text}) {
  return (
      <button
        onClick={handleReturn}
        className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
        <ChevronLeft className=" h-5 w-5" />
        {text}
      </button>  
  )
}
