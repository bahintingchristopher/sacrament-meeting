'use client';

function handlePrint(): void {
  window.print();
}

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={handlePrint}
      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
    >
      Print Program
    </button>
  );
}
