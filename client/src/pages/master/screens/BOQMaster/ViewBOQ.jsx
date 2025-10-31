// client/src/pages/master/screens/BOQMaster/ViewBOQ.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SecondaryButton from '../../../../components/SecondaryButton';
import { Upload, Download } from 'lucide-react';
import BoqCategoryTabs from '../../../../components/BoqCatgoryTabs';
import BOQTable from '../../../../components/BOQTable';

// const createSafePrefix = (name) => {
//   if (!name || typeof name !== 'string') {
//     return `invalid_name_${Math.random().toString(36).substring(2, 8)}`;
//   }
//   return name
//     .toLowerCase()
//     .replace(/[^a-z0-9_]+/g, '_')
//     .replace(/^_+|_+$/g, '');
// };

const ViewBOQ = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeBoqCategory, setActiveBoqCategory] = useState('civil');
  const { boqName = 'Default BOQ Title', selectedItems = [] } = location.state || {};


  const createInitialDynamicData = (items) => {
    const dynamicData = {};
    items.forEach(item => {
      // Initialize with empty/default values
      dynamicData[item] = { qty: '', amount: '' }; 
    });
    return dynamicData;
  };

  const boqCategoryTabs = useMemo(() => [
    { label: 'Civil', value: 'civil' },
    { label: 'Mechanical', value: 'mechanical' },
    { label: 'Electrical', value: 'electrical' },
  ], []);

  

  const [boqData, setBoqData] = useState([
    {
      sno: 1, 
      itemCode: 'CIV-001',
      itemDescription: 'Excavation',
      itemSpecification: 'Earthwork in excavation',
      uom: 'Cum',
      // Use the helper to create dynamicData based on props
      dynamicData: createInitialDynamicData(selectedItems), 
      totalQty: '', // Will be calculated
      unit: 'Cum',
      rate: '',
      totalAmount: '' // Will be calculated
    },
    {
      sno: 2,
      itemCode: 'CIV-002',
      itemDescription: 'PCC',
      itemSpecification: 'Plain Cement Concrete (1:4:8)',
      uom: 'Cum',
      // Use the helper here too
      dynamicData: createInitialDynamicData(selectedItems),
      totalQty: '',
      unit: 'Cum',
      rate: '',
      totalAmount: ''
    },
  ]);

 const handleDataChange = (rowIndex, field, value, columnName = null) => {
    setBoqData(prevData => {
      const newData = [...prevData];
      const row = { ...newData[rowIndex] }; // Deep copy the row

      if (columnName) {
        // Update dynamic column data
        row.dynamicData = { ...row.dynamicData }; // Deep copy dynamicData
        if (!row.dynamicData[columnName]) {
          row.dynamicData[columnName] = {};
        }
        row.dynamicData[columnName] = {
          ...row.dynamicData[columnName],
          [field]: value
        };
      } else {
        // Update regular field
        row[field] = value;
      }
      
      // Note: You'll need to add logic here to recalculate totals


      newData[rowIndex] = row;
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
 <div
  className="
    bg-white
    
    rounded-lg 
    shadow-sm 
    border 
    border-gray-200 
    overflow-x-auto 
    overflow-y-hidden
    scrollbar-thin 
    scrollbar-thumb-gray-400 
    scrollbar-track-gray-100 
    w-full
    md:max-w-[95vw]
  "
>
 <div className="min-w-[900px] md:min-w-[1300px] lg:min-w-[1500px]">
        <BOQTable
          data={boqData}
          selectedColumns={selectedItems} 
          onDataChange={handleDataChange}
        />
      </div>
      </div>


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
