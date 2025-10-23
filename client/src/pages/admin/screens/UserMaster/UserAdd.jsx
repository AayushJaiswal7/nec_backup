import InputField from "../../../../components/InputField.jsx";
import DatePickerField from "../../../../components/DatePickerField.jsx";
import ButtonComponent from "../../../../components/ButtonComponent.jsx";

const AddUser = () => {

  
  return (
    <>
   
      <div className="p-5 space-y-10">
        <div className="flex flex-wrap gap-5 md:gap-20">
          <InputField
            placeholder="User ID "
            label="User ID (auto-generated)"
            width="w-60"
          />
          <InputField
            placeholder="Enter User Name here"
            label="User Name"
            width="w-60"
          />
          <InputField
            placeholder="Enter Email ID here"
            label="Email ID"
            width="w-60"
          />
          <InputField
            placeholder="Enter Contact Number here"
            label="Contact Number"
            width="w-60"
          />
        </div>

        <div className="flex flex-wrap gap-5 md:gap-20 ">
          <InputField placeholder="Select Role" label="Role" width="w-60" />
          <InputField
            placeholder="Select department"
            label="Department"
            width="w-60"
          />
          <InputField placeholder="Select Branch" label="Branch" width="w-60" />
        </div>
        <div className="flex flex-wrap gap-5 md:gap-20">
          <InputField
            placeholder="Auto Generated Password"
            label="Initial Password"
            width="w-60"
          />
          <DatePickerField label="Valid From" width="w-60" />
          <DatePickerField label="Valid To" width="w-60" />
          <div className="p-3">
            <input type="checkbox" className="mt-7" />{" "}
            <span className="mt-7 px-2 text-sm font-medium text-gray-700">
              inactive
            </span>
          </div>
        </div>

        <ButtonComponent
          title="Save"
          color="primary"
          onClick={() => alert("User Added")}
        />
      </div>
    </>
  );
};

export default AddUser;
