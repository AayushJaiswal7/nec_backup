import React from 'react';

// Reusable BOQ Table Component
const BOQTable = ({
  data = [],
  selectedColumns = [],
  onDataChange = () => {}
}) => {
  const handleCellChange = (rowIndex, field, value, columnName = null) => {
    onDataChange(rowIndex, field, value, columnName);
  };

  return (
    <div className="w-full overflow-auto max-h-[calc(100vh-280px)] border border-gray-200 rounded-md">
      <table className="w-full border-collapse border border-gray-300 text-sm min-w-[1200px]">
        <thead>
          {/* Main Header Row */}
          <tr className="bg-[#FFF9F6] sticky top-0 z-10">
            <th rowSpan={2} className="border border-gray-300 px-2 py-2 text-left min-w-[50px] font-semibold">S NO</th>
            <th rowSpan={2} className="border border-gray-300 px-2 py-2 text-left min-w-[80px] font-semibold">Item Code</th>
            <th rowSpan={2} className="border border-gray-300 px-2 py-2 text-left min-w-[200px] font-semibold">Item Description</th>
            <th rowSpan={2} className="border border-gray-300 px-2 py-2 text-left min-w-[150px] font-semibold">Item Specification</th>
            <th rowSpan={2} className="border border-gray-300 px-2 py-2 text-left min-w-[60px] font-semibold">UOM</th>
            
            {/* Dynamic Columns */}
            {selectedColumns.map((col) => (
              <th key={col} colSpan={2} className="border border-gray-300 px-2 py-2 text-center min-w-[150px] font-semibold">
                {col}
              </th>
            ))}
            
            <th rowSpan={2} className="border border-gray-300 px-2 py-2 text-center min-w-[80px] font-semibold">Total QTY</th>
            <th rowSpan={2} className="border border-gray-300 px-2 py-2 text-center min-w-[80px] font-semibold">Unit</th>
            <th rowSpan={2} className="border border-gray-300 px-2 py-2 text-center min-w-[100px] font-semibold">Rate (Rs)</th>
            <th rowSpan={2} className="border border-gray-300 px-2 py-2 text-center min-w-[120px] font-semibold">Total Amount (Rs)</th>
          </tr>
          
          {/* Sub Header Row for Dynamic Columns */}
          <tr className="bg-[#FFF9F6] sticky top-[41px] z-10">
            {selectedColumns.map((col) => (
              <React.Fragment key={`${col}-sub`}>
                <th className="border border-gray-300 px-2 py-2 text-center min-w-[75px] font-semibold">QTY</th>
                <th className="border border-gray-300 px-2 py-2 text-center min-w-[75px] font-semibold">Amount</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={10 + (selectedColumns.length * 2)} className="border border-gray-300 px-2 py-4 text-center text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index} className={row.isHeader ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}>
                <td className="border border-gray-300 px-1 py-0">
                  <input
                    type="text"
                    value={row.sno || ''}
                    onChange={(e) => handleCellChange(index, 'sno', e.target.value)}
                    className="w-full px-2 py-2 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-primaryColor"
                  />
                </td>
                <td className="border border-gray-300 px-1 py-0">
                  <input
                    type="text"
                    value={row.itemCode || ''}
                    onChange={(e) => handleCellChange(index, 'itemCode', e.target.value)}
                    className="w-full px-2 py-2 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-primaryColor"
                  />
                </td>
                <td className={`border border-gray-300 px-2 py-2 ${row.isHeader ? 'bg-gray-100' : 'bg-gray-50'}`}>{row.itemDescription}</td>
                <td className="border border-gray-300 px-1 py-0">
                  <input
                    type="text"
                    value={row.itemSpecification || ''}
                    onChange={(e) => handleCellChange(index, 'itemSpecification', e.target.value)}
                    className="w-full px-2 py-2 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-primaryColor"
                  />
                </td>
                <td className="border border-gray-300 px-1 py-0">
                  <input
                    type="text"
                    value={row.uom || ''}
                    onChange={(e) => handleCellChange(index, 'uom', e.target.value)}
                    className="w-full px-2 py-2 text-center border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-primaryColor"
                  />
                </td>
                
                {/* Dynamic Column Values */}
                {selectedColumns.map((col) => (
                  <React.Fragment key={`${col}-${index}`}>
                    <td className="border border-gray-300 px-1 py-0">
                      <input
                        type="text"
                        value={row.dynamicData?.[col]?.qty || ''}
                        onChange={(e) => handleCellChange(index, 'qty', e.target.value, col)}
                        className="w-full px-2 py-2 text-right border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-primaryColor"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-0">
                      <input
                        type="text"
                        value={row.dynamicData?.[col]?.amount || ''}
                        onChange={(e) => handleCellChange(index, 'amount', e.target.value, col)}
                        className="w-full px-2 py-2 text-right border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-primaryColor"
                      />
                    </td>
                  </React.Fragment>
                ))}
                
                <td className="border border-gray-300 px-1 py-0">
                  <input
                    type="text"
                    value={row.totalQty || ''}
                    onChange={(e) => handleCellChange(index, 'totalQty', e.target.value)}
                    className="w-full px-2 py-2 text-right border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-primaryColor"
                  />
                </td>
                <td className="border border-gray-300 px-1 py-0">
                  <input
                    type="text"
                    value={row.unit || ''}
                    onChange={(e) => handleCellChange(index, 'unit', e.target.value)}
                    className="w-full px-2 py-2 text-center border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-primaryColor"
                  />
                </td>
                <td className="border border-gray-300 px-1 py-0">
                  <input
                    type="text"
                    value={row.rate || ''}
                    onChange={(e) => handleCellChange(index, 'rate', e.target.value)}
                    className="w-full px-2 py-2 text-right border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-primaryColor"
                  />
                </td>
                <td className="border border-gray-300 px-1 py-0">
                  <input
                    type="text"
                    value={row.totalAmount || ''}
                    onChange={(e) => handleCellChange(index, 'totalAmount', e.target.value)}
                    className="w-full px-2 py-2 text-right border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-primaryColor"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BOQTable;