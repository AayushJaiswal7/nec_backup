import ButtonComponent from "../../../../components/ButtonComponent";
import InputField from "../../../../components/InputField";
import UserTable from "./UserTable";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const UserMaster = () => {
  const navigate = useNavigate();

    return (
        <>
            <div className="m-4">
                <div className="flex justify-between items-center w-full mx-2 pr-2">
                    <InputField placeholder="Search" icon={<CiSearch size={18} />} width="w-[250px]" />
                    <ButtonComponent
                        title="Add User"
                        className="bg-primaryColor text-white text-sm px-1 py-2 rounded flex items-center "
                        iconPosition={0}
                        icon={IoMdAdd}
                        onClick={() => navigate('/admin/add-user')} />
                </div>

                <div>
                    <UserTable />
                </div>
            </div>
        </>
    )
};

export default UserMaster;