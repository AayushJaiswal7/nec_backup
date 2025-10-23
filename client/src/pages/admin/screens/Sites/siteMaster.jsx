import { CiSearch } from "react-icons/ci";
import ButtonComponent from "../../../../components/ButtonComponent";
import InputField from "../../../../components/InputField";
import SiteTable from "./SiteTable";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SiteMaster = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="flex justify-between items-center w-full gap-3 m-2">
          <InputField
            placeholder="Search"
            icon={<CiSearch size={18} />}
            width="w-[250px]"
          />

          <ButtonComponent
            title="Add Site"
            className="bg-primaryColor text-white text-sm px-4 py-2 rounded flex items-center "
            iconPosition={0}
            icon={IoMdAdd}
            onClick={() => navigate("/admin/add-site")}
          />
        </div>

        <div>
          <SiteTable />
        </div>
      </div>
    </>
  );
};

export default SiteMaster;
