import React from 'react'; 
import ButtonComponent from '../../../../components/ButtonComponent';
import { IoMdAdd } from "react-icons/io";

const BoqMaster = () => {
 
  return (
    
    <div className="p-4"> {/* Add some padding using Tailwind */}
      {/* We'll add the button and table here */}
      <div className='flex justify-end mb-4'>
         <ButtonComponent
         title="Create BOQ Master"
        onClick={handleClick}
        icon={IoMdAdd} // Pass the icon component
        iconPosition={0}   // Icon on the left
        width="w-28"       // Specific width
        ></ButtonComponent>
      </div>
      <p>BOQ Master Content Goes Here</p> {/* Placeholder */}
    </div>
  );
};

export default BoqMaster; 