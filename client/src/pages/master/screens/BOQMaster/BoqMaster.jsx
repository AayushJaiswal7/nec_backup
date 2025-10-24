import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { SquarePen, Trash2 } from 'lucide-react';
import ButtonComponent from '../../../../components/ButtonComponent';
import CustomTable from '../../../../components/CustomTable';
import ReusableModal from '../../../../components/ReusableModal';
import InputField from '../../../../components/InputField';
// import { SortAsc } from 'lucide-react';
const BoqMaster = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [data, setData] = useState([

      {
         id: 1,
         sNo: 1,
         boqName: 'GMR',
         createdBy: 'User002, 12.12.2024 10:00PM',
         updatedBy: 'User002, 12.12.2024 10:00PM',
      },

      {
         id: 2,
         sNo: 2,
         boqName: 'BOQ - Commercial Apartment Construction',
         createdBy: 'User002, 12.12.2024 10:00PM',
         updatedBy: 'User002, 12.12.2024 10:00PM',
      },
      {
         id: 3,
         sNo: 7,
         boqName: 'Master BOQ - Residential Apartment Construction',
         createdBy: 'User002, 12.12.2024 10:00PM',
         updatedBy: 'User002, 12.12.2024 10:00PM',
      },

   ]);
   const handleCreateBoq = () => {
      //  alert('Create BOQ Master button clicked!'); 
      setIsModalOpen(true);
   };

   const columns = [
      {
         name: 'S No',
         selector: row => row.sNo,
         sortable: true,
         width: '100px',
      },
      {
         name: 'Master BOQ Name',
         selector: row => row.boqName,
         sortable: false,
      },
      {
         name: 'Created By',
         selector: row => row.createdBy,
         sortable: true,

      },
      {
         name: 'Updated By',
         selector: row => row.updatedBy,
         sortable: true,

      },

      {
         name: 'Actions',
         cell: (row) => (
            <div className="flex gap-4">

               <button className="text-black-600 hover:text-black-800">
                  <SquarePen size={18} />
               </button>
               <button className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
               </button>

            </div>
         ),
         width: '100px',
      },

   ];

   return (

      <div className="p-4">
         <div className='flex justify-end mb-4'>
            {/* create boq master */}
            <ButtonComponent
               title="Create BOQ Master"
               icon={IoMdAdd}
               iconPosition={0}
               onClick={handleCreateBoq}
            ></ButtonComponent>
         </div>
         {/* table component */}
         <CustomTable
            columns={columns}
            data={data}
         />
         
         <ReusableModal
            isOpen={isModalOpen} // Control visibility with state
            onClose={() => setIsModalOpen(false)}
            title=""
         ><div className="space-y-6">

               {/* BOQ Name Input */}
               <InputField
                  label="BOQ Name"
                  placeholder="Enter master BOQ name"
                  name="boqName"

               />

               {/* Checkbox Grid */}
               <div className="flex space-x-6"> 

                  {/* Column 1: Factory */}
                  <div className="flex flex-col space-y-3"> 
                     <label className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Factory</span>
                     </label>
                     <label className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Factory 1</span>
                     </label>
                     {/* ... Factory 2, 3, 4 ... */}
                  </div>

                  {/* Column 2: Office */}
                  <div className="flex flex-col space-y-3">
                     <label className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Office</span>
                     </label>
                     <label className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Office 1</span>
                     </label>
                     
                  </div>
                  <div className="flex flex-col space-y-3">
                     <label className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>External</span>
                     </label>
                     <label className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>External 1</span>
                     </label>
                     
                  </div>
                  <div className="flex flex-col space-y-3">
                     <label className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Other</span>
                     </label>
                     <label className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Other 1</span>
                     </label>
                     
                  </div>
                 

               </div>

               {/* Generate Button */}
               <div className="flex justify-center pt-4">
                  <ButtonComponent
                     title="Generate BOQ Sheet"
                  // Add onClick later
                  />
               </div>

            </div>

         </ReusableModal>
      </div>
   );
};

export default BoqMaster; 