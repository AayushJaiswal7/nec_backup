import React from "react";
import { AiOutlineExport } from "react-icons/ai";

export default function ExportCSV({ tableId, filename = "export.csv" }) {
  const handleExport = () => {
    const table = document.getElementById(tableId);
    if (!table) {
      alert(`Table: ${tableId} not found`);
      return;
    }

    const rows = Array.from(table.querySelectorAll("tr"));
    const csvContent = rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("th, td"));
      return cells.map((cell) => {
        let text = cell.innerText.replace(/"/g, '""');
        if (text.includes(",") || text.includes('"') || text.includes("\n")) {
          text = `"${text}"`;
        }
        return text;
      }).join(",");
    }).join("\n");

    const blob = new Blob([csvContent],{ type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <button
      onClick={handleExport}
      className="relative w-fit max-w-sm cursor-pointer rounded-md border border-gray-600 bg-[#FFF7F5] px-3 py-2 sm:px-4 sm:py-2.5 pl-10 sm:pl-12 text-sm sm:text-base text-gray-600 placeholder-gray-400 hover:border-blue-500 hover:ring-1 hover:ring-blue-500 transition"
    >
      <span className="whitespace-nowrap">Export to CSV</span>
      <div className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none text-gray-600">
        <AiOutlineExport className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
    </button>
  );
}