import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { SquarePen, Trash2 } from 'lucide-react';
import ButtonComponent from '../../../../components/ButtonComponent';
import CustomTable from '../../../../components/CustomTable';
import InputField from '../../../../components/InputField';
import CustomModal from '../../../../components/CustomModal';
import { useNavigate } from 'react-router-dom';

const checkboxCategories = {
    Factory: ['Factory 1', 'Factory 2', 'Factory 3', 'Factory 4'],
    Office: ['Office 1', 'Office 2', 'Office 3', 'Office 4'],
    External: ['External 1', 'External 2', 'External 3', 'External 4'],
    Other: ['Other 1', 'Other 2', 'Other 3', 'Other 4'],
};

const BoqMaster = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [boqName, setBoqName] = useState('');
    const [boqNameError, setBoqNameError] = useState('');
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
    const navigate = useNavigate();
    const [data] = useState([
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
        setBoqName('');
        setSelectedCheckboxes({});
        setBoqNameError('');
        setIsModalOpen(true);
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setSelectedCheckboxes(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleGenerateBoq = () => {
        if (!boqName.trim()) {
            setBoqNameError("BOQ Name is required.");
            return;
        }
        setBoqNameError('');

        const selectedItemsArray = Object.keys(selectedCheckboxes)
            .filter(key => selectedCheckboxes[key])
            .map(key => {
                const parts = key.split('-');
                return parts.length > 1 ? parts.slice(1).join('-') : parts[0];
            })
            .filter(name => name);

        navigate('/master/boq-master/view', {
            state: {
                boqName: boqName,
                selectedItems: selectedItemsArray
            }
        });

        setIsModalOpen(false);
    };

    const columns = [
        {
            name: 'S No',
            selector: row => row.sNo,
            sortable: true,
            width: '80px',
        },
        {
            name: 'Master BOQ Name',
            selector: row => row.boqName,
            sortable: false,
            wrap: true,
        },
        {
            name: 'Created By',
            selector: row => row.createdBy,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Updated By',
            selector: row => row.updatedBy,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex gap-3">
                    <button className="text-black hover:text-gray-700">
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
        <div className="p-4 w-full overflow-hidden">
            
            <div className="flex justify-end mb-4">
                <div className="min-w-[180px] sm:min-w-[200px] md:min-w-[220px]">
                    <ButtonComponent
                        title="Create BOQ Master"
                        icon={IoMdAdd}
                        iconPosition={0}
                        onClick={handleCreateBoq}
                    />
                </div>
            </div>

          
            <div className="w-full overflow-x-auto">
                <div className="min-w-[600px] md:min-w-full">
                    <CustomTable
                        columns={columns}
                        data={data}
                    />
                </div>
            </div>

           
            <CustomModal
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
                size="lg"
                footer
            >
                <div className="space-y-6">
                    {/* Input field section */}
                    <InputField
                        label="BOQ Name"
                        placeholder="Enter master BOQ name"
                        name="boqName"
                        className="rounded border-gray-300 accent-primaryColor focus:ring-primaryColor"
                        isRequired={true}
                        value={boqName}
                        onChange={(e) => {
                            setBoqName(e.target.value);
                            if (e.target.value.trim()) setBoqNameError('');
                        }}
                        error={boqNameError}
                    />

                    {/* Responsive checkbox grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3 pt-2">
                        {Object.entries(checkboxCategories).flatMap(([category, items]) =>
                            items.map((item) => (
                                <label
                                    key={`${category}-${item}`}
                                    className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors duration-150"
                                >
                                    <input
                                        type="checkbox"
                                        name={`${category}-${item}`}
                                        checked={!!selectedCheckboxes[`${category}-${item}`]}
                                        onChange={handleCheckboxChange}
                                        className="h-4 w-4 rounded border-gray-300 text-primaryColor focus:ring-primaryColor focus:ring-offset-0"
                                    />
                                    <span>{item}</span>
                                </label>
                            ))
                        )}
                    </div>

                    {/* Centered generate button */}
                    <div className="flex justify-center pt-4">
                        <ButtonComponent
                            title="Generate BOQ Sheet"
                            onClick={handleGenerateBoq}
                        />
                    </div>
                </div>
            </CustomModal>
        </div>
    );
};

export default BoqMaster;
