import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../../axiosConfig'; // Adjust path
import Breadcrumb from '../../../../components/BreadCrumb'; // Adjust path
import ButtonComponent from '../../../../components/ButtonComponent'; // Adjust path
import { FileUp, FileDown } from 'lucide-react';
import BoqTableRow from './BoqTableRow'; // Import the row component

// STEP 4: Dummy data for backend path placeholder
const placeholderData = [
    {
        id: '1', sno: 1, itemCode: '1', description: 'Civil Works', spec: '-', uom: 'LS', category: 'Civil',
        factoryQty: '', factoryAmt: '', officeQty: '', officeAmt: '', otherQty: '', otherAmt: '', vendorQty: '', vendorAmt: '', totalQty: '', unitRate: '', totalAmt: '',
        children: [
            {
                id: '1.1', sno: 2, itemCode: '1.1', description: 'STRUCTURE WORK', spec: '-', uom: 'LS', category: 'Civil',
                factoryQty: '', factoryAmt: '', officeQty: '', officeAmt: '', otherQty: '', otherAmt: '', vendorQty: '', vendorAmt: '', totalQty: '', unitRate: '', totalAmt: '',
                children: [
                    { id: '1.1.1', sno: 3, itemCode: '1.1.1', description: 'EARTHWORK', spec: '-', uom: 'Cum', category: 'Civil', factoryQty: '', factoryAmt: '', officeQty: '', officeAmt: '', otherQty: '', otherAmt: '', vendorQty: '', vendorAmt: '', totalQty: '', unitRate: '', totalAmt: '' },
                    { id: '1.1.1.1', sno: 4, itemCode: '1.1.1.1', description: 'Excavation', spec: '-', uom: 'Cum', category: 'Civil', factoryQty: '10', factoryAmt: '100', officeQty: '5', officeAmt: '50', otherQty: '', otherAmt: '', vendorQty: '', vendorAmt: '', totalQty: '15', unitRate: '10', totalAmt: '150' },
                    { id: '1.1.1.2', sno: 5, itemCode: '1.1.1.2', description: 'Earth work in excavation', spec: '-', uom: 'Cum', category: 'Civil', factoryQty: '20', factoryAmt: '200', officeQty: '', officeAmt: '', otherQty: '', otherAmt: '', vendorQty: '', vendorAmt: '', totalQty: '20', unitRate: '10', totalAmt: '200' },
                ]
            },
        ]
    },
    {
        id: '2', sno: 10, itemCode: '2', description: 'Mechanical', spec: '-', uom: 'LS', category: 'Mechanical',
        factoryQty: '', factoryAmt: '', officeQty: '', officeAmt: '', otherQty: '', otherAmt: '', vendorQty: '', vendorAmt: '', totalQty: '', unitRate: '', totalAmt: '',
        children: [
             { id: '2.1', sno: 11, itemCode: '2.1', description: 'PLUMBING, SANITARY MECHANICAL WORK', spec: '-', uom: 'LS', category: 'Mechanical', factoryQty: '', factoryAmt: '', officeQty: '', officeAmt: '', otherQty: '', otherAmt: '', vendorQty: '', vendorAmt: '', totalQty: '', unitRate: '', totalAmt: '' },
        ]
    },
     { id: '3', sno: 20, itemCode: '3', description: 'Electrical', spec: '-', uom: 'LS', category: 'Electrical', factoryQty: '', factoryAmt: '', officeQty: '', officeAmt: '', otherQty: '', otherAmt: '', vendorQty: '', vendorAmt: '', totalQty: '', unitRate: '', totalAmt: '' },
];

const ViewBOQ = () => {
    const { boqId } = useParams(); // Get ID from URL
    const navigate = useNavigate();
    const fileInputRef = useRef(null); // Ref for hidden file input

    // --- State Variables ---
    const [boqName, setBoqName] = useState('Loading...');
    const [boqSheetData, setBoqSheetData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All'); // For filter

    // --- STEP 4: Data Fetching (Path to accept backend data) ---
    useEffect(() => {
        const fetchBoqData = async () => {
            console.log("Fetching data for BOQ ID:", boqId);
            setLoading(true);
            setError(null);
            
            try {
                // --- THIS IS THE PATH TO ACCEPT DATA FROM BACKEND ---
                // const response = await axios.get(`/api/boq-masters/${boqId}`);
                // setBoqName(response.data.name);
                // setBoqSheetData(response.data.items);
                // ----------------------------------------------------

                // --- Using Placeholder Data For Now ---
                // Simulating API delay
                await new Promise(resolve => setTimeout(resolve, 500)); 
                setBoqName(`Master BOQ - ${boqId.replace(/-/g, ' ')}`);
                setBoqSheetData(placeholderData);
                // --- End Placeholder ---

                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch BOQ:", err);
                setError('Failed to load BOQ data.');
                setLoading(false);
            }
        };

        fetchBoqData();
    }, [boqId]); // Re-run effect if boqId changes

    // --- Event Handlers ---
    const handleBack = () => navigate(-1); // Go back

    // STEP 2: Import/Export Handlers
    const handleImportClick = () => {
        // Trigger hidden file input
        fileInputRef.current.click();
    };

    const handleFileImport = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Importing file:", file.name);
            // --- TODO: Add CSV parsing logic here ---
            // Example:
            // const reader = new FileReader();
            // reader.onload = (e) => {
            //   const csvData = e.target.result;
            //   // Parse csvData (using a library like Papaparse is recommended)
            //   // const parsedData = ...
            //   // setData(parsedData); // Update state with parsed data
            // };
            // reader.readAsText(file);
            alert(`File "${file.name}" selected. Parsing logic to be implemented.`);
        }
    };

    const handleExport = () => {
        alert('Export CSV - To be implemented');
        // --- TODO: Add CSV generation logic here ---
        // 1. Flatten the hierarchical 'boqSheetData'
        // 2. Format it into a CSV string
        // 3. Use logic from ExportCSV.jsx to create Blob and download
    };

    // STEP 3 (User's Step 4): Filter Logic
    const handleCategoryFilter = (category) => {
        setActiveCategory(category);
    };

    // This filtering is applied before rendering
    // We comment out the filter logic as requested, so all sample data shows
    // const filteredData = activeCategory === 'All'
    //     ? boqSheetData
    //     : boqSheetData.filter(item => item.category === activeCategory);
    const filteredData = boqSheetData; // STEP 3: Show all data for now

    // --- Breadcrumb Items ---
    const breadcrumbItems = [
        { label: "Master Data", href: "/master" },
        { label: "BOQ Master", href: "/master/boq-master" },
        { label: boqName } // Current page
    ];

    if (loading) return <div className="p-6 text-center">Loading BOQ Details...</div>;
    if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-full">
            <Breadcrumb items={breadcrumbItems} onBackRoute={handleBack} />

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 mt-2 gap-2">
                <h1 className="text-xl font-semibold text-gray-800 truncate">{boqName}</h1>
                <div className="flex gap-2 flex-shrink-0">
                    {/* Hidden file input for import */}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileImport}
                        className="hidden" 
                        accept=".csv" 
                    />
                    <ButtonComponent title="Import as CSV" onClick={handleImportClick} icon={FileUp} iconPosition={0} />
                    <ButtonComponent title="Export to CSV" onClick={handleExport} icon={FileDown} iconPosition={0} />
                </div>
            </div>

            {/* STEP 3: Scrollable Table Area */}
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-auto max-h-[70vh]">
                <table className="min-w-full divide-y divide-gray-200 border-collapse text-sm">
                    {/* Table Header */}
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                            <th rowSpan="2" className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border">S NO</th>
                            <th rowSpan="2" className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border">Item Code</th>
                            <th rowSpan="2" className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border min-w-[250px]">Item Description</th>
                            <th rowSpan="2" className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border min-w-[150px]">Item Specification</th>
                            <th rowSpan="2" className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border">UOM</th>
                            <th colSpan="2" className="px-3 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border">Factory</th>
                            <th colSpan="2" className="px-3 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border">Office</th>
                            <th colSpan="2" className="px-3 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border">Other/Utilities</th>
                            <th colSpan="2" className="px-3 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border">External/Vendor</th>
                            <th rowSpan="2" className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border">Total QTY</th>
                            <th rowSpan="2" className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border">Unit Rate(Rs)</th>
                            <th rowSpan="2" className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border">Total Amount(Rs)</th>
                        </tr>
                        <tr>
                            {/* Sub-headers */}
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border">QTY</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border">Amount</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border">QTY</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border">Amount</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border">QTY</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border">Amount</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border">QTY</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border">Amount</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredData.length > 0 ? (
                            filteredData.map(item => (
                                <BoqTableRow key={item.id} item={item} level={0} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="18" className="px-4 py-10 text-center text-gray-500">
                                    No data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* End Scrollable Table Area */}

            {/* Category Filters */}
            <div className="mt-4 flex justify-center gap-3">
                 {['All', 'Civil', 'Mechanical', 'Electrical'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryFilter(cat)}
                        className={`px-4 py-1.5 rounded text-sm font-medium transition-colors duration-150 ${
                            activeCategory === cat
                                ? 'bg-primaryColor text-white shadow-sm'
                                : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'
                        }`}
                     >
                        {cat}
                     </button>
                 ))}
            </div>
        </div>
    );
};

export default ViewBOQ;
