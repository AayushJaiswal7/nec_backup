// src/pages/petty-cash/screens/PettyCashRegister.jsx
import React, { useState } from 'react';
import CustomTable from '../../../components/CustomTable';
import Breadcrumb from '../../../components/BreadCrumb';
import { useNavigate } from 'react-router-dom';
import { ChevronUp, ChevronDown } from 'lucide-react';

const PettyCashRegister = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const breadcrumbItems = [
    { label: 'Petty Cash', onClick: () => navigate('/petty-cash') },
    { label: 'Petty Cash Register' },
  ];

  const handleBackRoute = () => navigate('/petty-cash');

  const columns = [
   { name: 'Date', selector: row => row.date, sortable: true, width: '120px', },
    { name: 'Cost Code', selector: row => row.costCode, sortable: true, width: '125px' },
    {
      name: 'Cost Code Name',
      selector: row => row.costCodeName,
      sortable: true,
      width: '180px',
      wrap: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
      sortable: false,
      wrap: true,
      grow: 2,
    },
    {
      name: 'Payee Or Payer',
      selector: row => row.payeeOrPayer,
      sortable: true,
      wrap: true,
    },
    { name: 'GST No', selector: row => row.gstNo, sortable: false, width: '150px' },
    { name: 'Bill No', selector: row => row.billNo, sortable: false, width: '100px' },

    // ✅ Gross Value column
    {
      name: 'Gross Value',
      selector: row => row.grossValue,
      sortable: true,
      width: '130px',
      cell: row => {
        const isUp = row.grossValueTrend === 'up';
        const isDown = row.grossValueTrend === 'down';
        const color = isUp ? 'text-green-600' : isDown ? 'text-red-600' : 'text-gray-800';
        const icon = isUp ? (
          <ChevronUp size={14} className="ml-1 text-green-600 shrink-0" />
        ) : isDown ? (
          <ChevronDown size={14} className="ml-1 text-red-600 shrink-0" />
        ) : null;

        return (
          <div className="flex items-center justify-end w-full tabular-nums text-right whitespace-nowrap">
            <span className={`${color} font-medium`}>
              {isUp ? '+' : isDown ? '−' : ''}
              {row.grossValue.toLocaleString('en-IN')}
            </span>
            {icon}
          </div>
        );
      },
    },

    // ✅ Amount column
    {
      name: 'Amount',
      selector: row => row.amount,
      // sortable: true,
      width: '100px',
      cell: row => (
        <div className="w-full text-right tabular-nums whitespace-nowrap">
          {row.amount.toLocaleString('en-IN')}
        </div>
      ),
    },
  ];

  const data = [
    {
      date: '15.05.2025',
      costCode: '001',
      costCodeName: 'Opening Balance',
      description: 'Long Description',
      payeeOrPayer: 'SMCC Head',
      gstNo: 'GSTIN084294224',
      billNo: 'EWJFBJ',
      grossValue: 183372,
      grossValueTrend: 'up',
      amount: 183372,
    },
    {
      date: '15.05.2025',
      costCode: '001',
      costCodeName: 'Site Expenses',
      description: 'Long Description',
      payeeOrPayer: 'Amazon',
      gstNo: 'GSTIN084294234',
      billNo: 'BJHEBFB',
      grossValue: 183372,
      grossValueTrend: 'down',
      amount: 156432,
    },
    {
    date: '15.05.2025',
      costCode: '002',
      costCodeName: 'Materials Purchase',
      description: 'Cement bags',
      payeeOrPayer: 'Local Supplier',
      gstNo: 'GSTIN123456789',
      billNo: 'B-101',
      grossValue: 50000,
      grossValueTrend: 'down',
      amount: 48000,
    },
     {
    date: '15.05.2025',
      costCode: '002',
      costCodeName: 'Materials Purchase',
      description: 'Cement bags',
      payeeOrPayer: 'Local Supplier',
      gstNo: 'GSTIN123456789',
      billNo: 'B-101',
      grossValue: 50000,
      grossValueTrend: 'down',
      amount: 48000,
    }, {
    date: '15.05.2025',
      costCode: '002',
      costCodeName: 'Materials Purchase',
      description: 'Cement bags',
      payeeOrPayer: 'Local Supplier',
      gstNo: 'GSTIN123456789',
      billNo: 'B-101',
      grossValue: 50000,
      grossValueTrend: 'down',
      amount: 48000,
    }, {
    date: '15.05.2025',
      costCode: '002',
      costCodeName: 'Materials Purchase',
      description: 'Cement bags',
      payeeOrPayer: 'Local Supplier',
      gstNo: 'GSTIN123456789',
      billNo: 'B-101',
      grossValue: 50000,
      grossValueTrend: 'down',
      amount: 48000,
    }, {
    date: '15.05.2025',
      costCode: '002',
      costCodeName: 'Materials Purchase',
      description: 'Cement bags',
      payeeOrPayer: 'Local Supplier',
      gstNo: 'GSTIN123456789',
      billNo: 'B-101',
      grossValue: 50000,
      grossValueTrend: 'down',
      amount: 48000,
    }, {
    date: '15.05.2025',
      costCode: '002',
      costCodeName: 'Materials Purchase',
      description: 'Cement bags',
      payeeOrPayer: 'Local Supplier',
      gstNo: 'GSTIN123456789',
      billNo: 'B-101',
      grossValue: 50000,
      grossValueTrend: 'down',
      amount: 48000,
    }, {
    date: '15.05.2025',
      costCode: '002',
      costCodeName: 'Materials Purchase',
      description: 'Cement bags',
      payeeOrPayer: 'Local Supplier',
      gstNo: 'GSTIN123456789',
      billNo: 'B-101',
      grossValue: 50000,
      grossValueTrend: 'down',
      amount: 48000,
    }, {
    date: '15.05.2025',
      costCode: '002',
      costCodeName: 'Materials Purchase',
      description: 'Cement bags',
      payeeOrPayer: 'Local Supplier',
      gstNo: 'GSTIN123456789',
      billNo: 'B-101',
      grossValue: 50000,
      grossValueTrend: 'down',
      amount: 48000,
    }, {
    date: '15.05.2025',
      costCode: '002',
      costCodeName: 'Materials Purchase',
      description: 'Cement bags',
      payeeOrPayer: 'Local Supplier',
      gstNo: 'GSTIN123456789',
      billNo: 'B-101',
      grossValue: 50000,
      grossValueTrend: 'down',
      amount: 48000,
    },
  ];

  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
  

<div className="space-y-4 px-2 sm:px-4 md:px-6 lg:px-8 w-full">
  <Breadcrumb items={breadcrumbItems} onBackRoute={handleBackRoute} />

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
    

    <CustomTable
      columns={columns}
      data={paginatedData}
      pagination
      paginationServer={false}
      paginationTotalRows={data.length}
      paginationDefaultPage={currentPage}
      paginationPerPage={rowsPerPage}
      onChangePage={(page) => setCurrentPage(page)}
      />
      </div>
  </div>
</div>




  );
};

export default PettyCashRegister;
