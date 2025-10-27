// client/src/pages/master/screens/BOQMaster/ViewBOQ.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SecondaryButton from '../../../../components/SecondaryButton'; //Reusable Secondary Button
import { Upload, Download } from 'lucide-react'; // Icons for buttons
import DataTable from '../../../../components/DataTable';

const ViewBOQ = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //table column
  const { boqName = "Master BOQ - Residential Apartment Construction", selectedCategories = ['Factory', 'Office', 'Other/Utilities', 'External'] } = location.state || {}

  const allColumns = useMemo(() => [
    { header: 'S NO', dataKey: 's_no', width: 'w-16', editable: true },
    { header: 'Item Code', dataKey: 'item_code', width: 'w-32', editable: true },
    { header: 'Item Description', dataKey: 'item_description', minWidth: 'min-w-[250px]', editable: false }, // Not editable
    { header: 'Item Specification', dataKey: 'item_specification', minWidth: 'min-w-[200px]', editable: true },
    { header: 'UOM', dataKey: 'uom', width: 'w-20', editable: true },
    // --- Dynamic Category Columns ---
    // Parent Group Column Definition (used for header rendering)
    { header: 'Factory', dataKey: 'factory', visible: selectedCategories.includes('Factory'), isGroup: true, headerProps: { colSpan: 2 }, headerAlign: 'text-center' },
    { header: 'QTY', dataKey: 'factory_qty', width: 'w-20', align: 'text-right', editable: true, parent: 'Factory', visible: selectedCategories.includes('Factory') },
    { header: 'Amount', dataKey: 'factory_amount', width: 'w-24', align: 'text-right', editable: true, parent: 'Factory', visible: selectedCategories.includes('Factory') },
    { header: 'Office', dataKey: 'office', visible: selectedCategories.includes('Office'), isGroup: true, headerProps: { colSpan: 2 }, headerAlign: 'text-center' },
    { header: 'QTY', dataKey: 'office_qty', width: 'w-20', align: 'text-right', editable: true, parent: 'Office', visible: selectedCategories.includes('Office') },
    { header: 'Amount', dataKey: 'office_amount', width: 'w-24', align: 'text-right', editable: true, parent: 'Office', visible: selectedCategories.includes('Office') },
    { header: 'Other/Utilities', dataKey: 'other', visible: selectedCategories.includes('Other/Utilities'), isGroup: true, headerProps: { colSpan: 2 }, headerAlign: 'text-center' },
    { header: 'QTY', dataKey: 'other_qty', width: 'w-20', align: 'text-right', editable: true, parent: 'Other/Utilities', visible: selectedCategories.includes('Other/Utilities') },
    { header: 'Amount', dataKey: 'other_amount', width: 'w-24', align: 'text-right', editable: true, parent: 'Other/Utilities', visible: selectedCategories.includes('Other/Utilities') },
    { header: 'External', dataKey: 'external', visible: selectedCategories.includes('External'), isGroup: true, headerProps: { colSpan: 2 }, headerAlign: 'text-center' },
    { header: 'QTY', dataKey: 'external_qty', width: 'w-20', align: 'text-right', editable: true, parent: 'External', visible: selectedCategories.includes('External') },
    { header: 'Amount', dataKey: 'external_amount', width: 'w-24', align: 'text-right', editable: true, parent: 'External', visible: selectedCategories.includes('External') },
    // --- Fixed Trailing Columns ---
    { header: 'Unit', dataKey: 'unit', width: 'w-24', align: 'text-right', editable: true },
    { header: 'Total QTY', dataKey: 'total_qty', width: 'w-24', align: 'text-right', editable: true },
    { header: 'Rate (Rs)', dataKey: 'rate', width: 'w-28', align: 'text-right', editable: true },
    { header: 'Total Amount (Rs)', dataKey: 'total_amount', width: 'w-32', align: 'text-right', editable: true },
  ], [selectedCategories]);

  // Example Row (add more rows as needed)
  const [boqData, setBoqData] = useState([
    {
      s_no: 1, item_code: 'CIV-001', item_description: 'Excavation', item_specification: 'Earthwork in excavation', uom: 'Cum',
      factory_qty: 100, factory_amount: 50000,
      office_qty: 50, office_amount: 25000,
      other_qty: 20, other_amount: 10000,
      external_qty: 0, external_amount: 0,
      total_qty: 170, rate: 500, total_amount: 85000
    },
    {
      s_no: 2, item_code: 'CIV-002', item_description: 'PCC', item_specification: 'Plain Cement Concrete (1:4:8)', uom: 'Cum',
      factory_qty: 80, factory_amount: 480000,
      office_qty: 40, office_amount: 240000,
      other_qty: 15, other_amount: 90000,
      external_qty: 0, external_amount: 0,
      total_qty: 135, rate: 6000, total_amount: 810000
    },
    // Add more data rows here...
  ]);

  // --- Handler for cell changes ---
  const handleCellUpdate = (rowIndex, dataKey, newValue) => {
    setBoqData(prevData => {
      const newData = [...prevData];
      // Basic type handling attempt: Convert to number if the original was a number
      const originalValue = newData[rowIndex][dataKey];
      let updatedValue = newValue;
      if (typeof originalValue === 'number' && !isNaN(newValue) && newValue !== '') {
        updatedValue = Number(newValue);
      } else if (typeof originalValue === 'number' && newValue === '') {
        updatedValue = null; // Or 0, depending on desired behavior for empty number fields
      }

      newData[rowIndex] = { ...newData[rowIndex], [dataKey]: updatedValue };
      // TODO: Add logic here to recalculate 'total_qty' and 'total_amount' if needed
      console.log(`Updated row ${rowIndex}, key ${dataKey} to:`, updatedValue);
      return newData;
    });
  };
  const handleExport = () => {
    console.log("Export button clicked.");
    alert('Export functionality to be implemented.');
  };

  const handleImport = () => {
    console.log("Import button clicked.");
    alert('Import functionality to be implemented.');
  };
  
  const renderBoqHeader = (visibleColumns) => {//header 
    const topRow = [];
    const bottomRow = [];
    const topLevelVisibleCols = allColumns.filter(col => col.visible !== false && !col.parent);

    topLevelVisibleCols.forEach(col => {
      const thProps = {
        key: col.dataKey,
        colSpan: col.headerProps?.colSpan || 1,
        rowSpan: col.isGroup ? 1 : 2, 
        className: `p-2 border-r border-l border-gray-300 font-semibold text-sm sticky top-0 bg-[#FFF9F6] z-10 ${col.headerAlign || col.align || 'text-left'} ${col.width || ''}`,
      };
      topRow.push(<th {...thProps}>{col.header}</th>);

      if (col.isGroup) {
        // Find and add visible children to the bottom row
        allColumns.filter(child => child.parent === col.header && child.visible !== false).forEach(childCol => {
          const childThProps = {
            key: childCol.dataKey,
            className: `p-2 border-r border-gray-300 font-semibold text-sm sticky top-[41px] bg-[#FFF9F6] z-10 ${childCol.headerAlign || childCol.align || 'text-right'} ${childCol.width || ''}`, // Adjust top value based on actual header height
          };
          bottomRow.push(<th {...childThProps}>{childCol.header}</th>);
        });
      }
    });

    return (
      <>
        <tr className="border-b border-gray-300">{topRow}</tr>
        {bottomRow.length > 0 && <tr className="border-b-2 border-gray-400">{bottomRow}</tr>}
      </>
    );
  };

  // Filter columns for data rendering (only leaf nodes that are visible)
  const visibleLeafColumns = useMemo(() =>
    allColumns.filter(col => col.visible !== false && !col.isGroup),
    [allColumns]);


  return (
   <div className="pt-0 px-4 pb-4 w-full">
  {/* --- Section for Title and Buttons (Responsive) --- */}
  <div className="flex flex-wrap items-center justify-between gap-3 mt-4 mb-4 min-w-0">
    {/* Title */}
    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate max-w-[70%] min-w-0 sm:max-w-[60%] md:max-w-[50%]">
      {boqName}
    </h2>

    {/* Buttons */}
    <div className="flex flex-wrap gap-2 justify-end">
      <SecondaryButton
        text="Import as CSV"
        icon={Upload}
        onClick={handleImport}
        className="border-gray-300 hover:bg-gray-50 whitespace-nowrap"
      />
      <SecondaryButton
        text="Export to CSV"
        icon={Download}
        onClick={handleExport}
        className="border-gray-300 hover:bg-gray-50 whitespace-nowrap"
      />
    </div>
  </div>

  {/* --- Table Container --- */}
  <div
    className="
      w-full 
      lg:w-[90%] 
      xl:w-[85%] 
      2xl:w-[80%]
      transition-all duration-300 
      mt-6 
      border border-gray-200 
      rounded-md 
      overflow-x-auto 
      overflow-y-auto 
      max-h-[calc(100vh-280px)]
      min-w-0 
      flex-1
      "
  >
    <DataTable
      columns={visibleLeafColumns}
      data={boqData}
      rowKeyField="s_no"
      onCellChange={handleCellUpdate}
      renderHeader={renderBoqHeader}
      tableClassName="w-full border-collapse text-sm  table-auto"
      noDataMessage="No BOQ data to display."
    />
  </div>
</div>


  );
};

export default ViewBOQ;

