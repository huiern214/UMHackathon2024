import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportExcelButton = ({ data, filename }) => {
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, filename);
  };

  return (
    <button
      onClick={exportToExcel}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Export to Excel
    </button>
  );
};

export default ExportExcelButton;