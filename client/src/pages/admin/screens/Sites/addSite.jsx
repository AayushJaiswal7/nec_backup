// Importing reusable components
import InputField from "../../../../components/InputField.jsx";
import ButtonComponent from "../../../../components/ButtonComponent.jsx";
import FileUploadInput from "../../../../components/FileUploadInput.jsx";

const AddSite = () => {
  return (
    <>
      {/* Main container with padding and spacing */}
      <div className="p-5 space-y-10">
        {/* ---------- Row 1: Site Basic Info ---------- */}
        <div className="flex flex-wrap gap-5 md:gap-20">
          <InputField
            placeholder="Auto Generated"
            label="Site Code"
            width="w-60"
          />
          <InputField
            placeholder="Enter Site Name here"
            label="Site Name"
            width="w-60"
          />
          <InputField placeholder="Select Branch" label="Branch" width="w-60" />
          <InputField
            placeholder="Select Site Manager"
            label="Site Manager"
            width="w-60"
          />
        </div>

        {/* ---------- Row 2: Address Info ---------- */}
        <div className="flex flex-wrap gap-5 md:gap-20">
          <InputField
            placeholder="Enter Street Name here"
            label="Street Name"
            width="w-60"
          />
          <InputField
            placeholder="Enter City Name here"
            label="City"
            width="w-60"
          />
          <InputField
            placeholder="Enter State Name here"
            label="State"
            width="w-60"
          />
          <InputField
            placeholder="Enter Postal Code here"
            label="Postal Code"
            width="w-60"
          />
        </div>

        {/* ---------- Row 3: Country, GPS, and Upload ---------- */}
        <div className="flex flex-wrap gap-5 md:gap-20">
          <InputField
            placeholder="Select Country Name"
            label="Country"
            width="w-60"
          />
          <InputField
            placeholder="Paste GPS Location here"
            label="GPS Location (Optional)"
            width="w-60"
          />

          {/* Upload Documents Button */}

          <div className="flex flex-col justify-end">
            <FileUploadInput />
          </div>
        </div>

        {/* ---------- Save Button ---------- */}
        <div className="pt-5">
          <ButtonComponent
            title="Save"
            color="primary"
            onClick={() => alert("Site details saved")}
          />
        </div>
      </div>
    </>
  );
};

// Exporting the component
export default AddSite;
