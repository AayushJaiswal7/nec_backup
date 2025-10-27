// client/src/pages/master/screens/BOQMaster/ViewBOQ.jsx
import React, { useState, useMemo, Outlet } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SecondaryButton from '../../../../components/SecondaryButton'; //Reusable Secondary Button
import { Upload, Download } from 'lucide-react'; // Icons for buttons
import DataTable from '../../../../components/DataTable';
import { PillTabs } from '../../../../components/Tab';

const createSafePrefix = (name) => {
  if (!name || typeof name !== 'string') {
    return `invalid_name_${Math.random().toString(36).substring(2, 8)}`; // Fallback for safety
  }
  return name
    .toLowerCase()              // Convert to lowercase
    .replace(/[^a-z0-9_]+/g, '_') // Replace invalid characters (non-alphanumeric, non-underscore) with underscore
    .replace(/^_+|_+$/g, '');     // Remove leading/trailing underscores
};

const ViewBOQ = () => {
  const navigate = useNavigate();
  const location = useLocation();
const [activeBoqCategory, setActiveBoqCategory] = useState('civil');
  const { boqName = "Default BOQ Title", selectedItems = ["Factory 1", "Office 3"] } = location.state || {};

  const boqCategoryTabs = useMemo(() => [
    { label: "Civil", value: "civil" },
    { label: "Mechanical", value: "mechanical" },
    { label: "Electrical", value: "electrical" },
], []);
  const fixedStartColumns = useMemo(() => [
    { header: 'S NO', dataKey: 's_no', width: 'w-16', editable: true },
    { header: 'Item Code', dataKey: 'item_code', width: 'w-32', editable: true },
    { header: 'Item Description', dataKey: 'item_description', minWidth: 'min-w-[250px]', editable: false }, // Not editable
    { header: 'Item Specification', dataKey: 'item_specification', minWidth: 'min-w-[200px]', editable: true },
    { header: 'UOM', dataKey: 'uom', width: 'w-20', editable: true },
  ], []);

  const fixedEndColumns = useMemo(() => [
    { header: 'Unit', dataKey: 'unit', width: 'w-24', align: 'text-right', editable: true },
    { header: 'Total QTY', dataKey: 'total_qty', width: 'w-24', align: 'text-right', editable: true },
    { header: 'Rate (Rs)', dataKey: 'rate', width: 'w-28', align: 'text-right', editable: true },
    { header: 'Total Amount (Rs)', dataKey: 'total_amount', width: 'w-32', align: 'text-right', editable: true },
  ], []);



  // --- Generate dynamic column groups based on selectedItems from state ---
  const dynamicColumnGroups = useMemo(() => {
    return selectedItems.map(itemName => {
      const prefix = createSafePrefix(itemName); // Use helper function
      return {
        header: itemName,        // e.g., "Factory 1"
        dataKeyPrefix: prefix, // e.g., "factory_1"
        // editable: true, 
      };
    });
  }, [selectedItems]);

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
      let updatedValue = newValue;
      if (typeof originalValue === 'number' && !isNaN(newValue) && newValue !== '') {
        updatedValue = Number(newValue);
      } else if (typeof originalValue === 'number' && newValue === '') {
        updatedValue = null; // Or 0, depending on desired behavior for empty number fields
      }



      if (newData[rowIndex]) {
        newData[rowIndex] = { ...newData[rowIndex], [dataKey]: updatedValue };
      }
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
      lg:w-[100%] 
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
          fixedStartColumns={fixedStartColumns}
          dynamicColumnGroups={dynamicColumnGroups}
          fixedEndColumns={fixedEndColumns}
          data={boqData}
          rowKeyField="s_no"
          onCellChange={handleCellUpdate}
          tableClassName="w-full border-collapse text-sm  table-auto"
          noDataMessage="No BOQ data to display."
        />
      </div>
<div className="fixed bottom-0 left-20 right-0 z-10 bg-secondaryColor border-t border-orange-100 shadow-sm px-3 pt-2">
                
                <PillTabs
                    items={boqCategoryTabs}
                    // defaultValue="civil" // Set a default if needed
                    
                    basePath="" // Set to empty if paths aren't relevant here
                />
                 
                 <div className="h-px bg-white border-b border-orange-200"></div>
            </div>

           
        </div>

    
     
    


  );
};

export default ViewBOQ;

