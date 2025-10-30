// client/src/pages/master/screens/BOQMaster/ViewBOQ.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SecondaryButton from '../../../../components/SecondaryButton';
import { Upload, Download } from 'lucide-react';
import DataTable from '../../../../components/DataTable';
import BoqCategoryTabs from '../../../../components/BoqCatgoryTabs';

const createSafePrefix = (name) => {
  if (!name || typeof name !== 'string') {
    return `invalid_name_${Math.random().toString(36).substring(2, 8)}`;
  }
  return name
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, '_')
    .replace(/^_+|_+$/g, '');
};

const ViewBOQ = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeBoqCategory, setActiveBoqCategory] = useState('civil');
  const { boqName = 'Default BOQ Title', selectedItems = ['Factory 1', 'Office 3'] } = location.state || {};

  const boqCategoryTabs = useMemo(() => [
    { label: 'Civil', value: 'civil' },
    { label: 'Mechanical', value: 'mechanical' },
    { label: 'Electrical', value: 'electrical' },
  ], []);

  const fixedStartColumns = useMemo(() => [
    { header: 'S NO', dataKey: 's_no', width: 'w-16', editable: true },
    { header: 'Item Code', dataKey: 'item_code', width: 'w-32', editable: true },
    { header: 'Item Description', dataKey: 'item_description', minWidth: 'min-w-[250px]', editable: false },
    { header: 'Item Specification', dataKey: 'item_specification', minWidth: 'min-w-[200px]', editable: true },
    { header: 'UOM', dataKey: 'uom', width: 'w-20', editable: true },
  ], []);

  const fixedEndColumns = useMemo(() => [
    { header: 'Unit', dataKey: 'unit', width: 'w-24', align: 'text-right', editable: true },
    { header: 'Total QTY', dataKey: 'total_qty', width: 'w-24', align: 'text-right', editable: true },
    { header: 'Rate (Rs)', dataKey: 'rate', width: 'w-28', align: 'text-right', editable: true },
    { header: 'Total Amount (Rs)', dataKey: 'total_amount', width: 'w-32', align: 'text-right', editable: true },
  ], []);

  const dynamicColumnGroups = useMemo(() => {
    return selectedItems.map((itemName) => {
      const prefix = createSafePrefix(itemName);
      return {
        header: itemName,
        dataKeyPrefix: prefix,
      };
    });
  }, [selectedItems]);

  const [boqData, setBoqData] = useState([
    {
      s_no: 1,
      item_code: 'CIV-001',
      item_description: 'Excavation',
      item_specification: 'Earthwork in excavation',
      uom: 'Cum',
      factory_qty: 100,
      factory_amount: 50000,
      office_qty: 50,
      office_amount: 25000,
      total_qty: 150,
      rate: 500,
      total_amount: 75000,
    },
    {
      s_no: 2,
      item_code: 'CIV-002',
      item_description: 'PCC',
      item_specification: 'Plain Cement Concrete (1:4:8)',
      uom: 'Cum',
      factory_qty: 80,
      factory_amount: 480000,
      office_qty: 40,
      office_amount: 240000,
      total_qty: 120,
      rate: 6000,
      total_amount: 720000,
    },
  ]);

  const handleCellUpdate = (rowIndex, dataKey, newValue) => {
    setBoqData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex] = { ...newData[rowIndex], [dataKey]: newValue };
      return newData;
    });
  };

  const handleExport = () => alert('Export functionality to be implemented.');
  const handleImport = () => alert('Import functionality to be implemented.');

  return (
    <div className="pt-0 px-4 pb-4 w-full overflow-hidden">
  {/* --- Title and Buttons --- */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 mb-4">
    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate max-w-full">
      {boqName}
    </h2>

    {/* Buttons — responsive wrapping, prevent overflow */}
    <div className="flex flex-wrap gap-2 justify-start sm:justify-end w-full sm:w-auto">
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

  
{/* --- Scrollable Table --- */}
{/* <div
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
      </div> */}


      {/* --- Fixed Bottom Tabs (Unchanged) --- */}
      <div className="fixed bottom-0 left-20 right-0 z-10 shadow-[0_-1px_3px_rgba(0,0,0,0.05)] bg-white">
        <BoqCategoryTabs
          items={boqCategoryTabs}
          activeTab={activeBoqCategory}
          onTabChange={setActiveBoqCategory}
        />
      </div>
    </div>
  );
};

export default ViewBOQ;
