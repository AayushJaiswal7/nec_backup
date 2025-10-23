import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import CustomTable from "../../../../components/CustomTable";
import InputField from "../../../../components/InputField";
import ButtonComponent from "../../../../components/ButtonComponent";

export default function Roles() {
  const [roleName, setRoleName] = useState("");
  const [roles, setRoles] = useState([
    { id: 1, name: "Site Manager 1", authorizations: "232" },
    { id: 2, name: "Branch Manager", authorizations: "43" },
    { id: 3, name: "Head Controller", authorizations: "232" },
    { id: 4, name: "Site Manager 2", authorizations: "Unassigned" },
    { id: 5, name: "Project Manager", authorizations: "43" },
    { id: 6, name: "Site Engineer", authorizations: "232" },
  ]);

  const handleAddRole = () => {
    if (!roleName.trim()) return;
    const newRole = {
      id: roles.length + 1,
      name: roleName,
      authorizations: "Unassigned",
    };
    setRoles([...roles, newRole]);
    setRoleName("");
  };

  const handleDelete = (id) => {
    setRoles(roles.filter((r) => r.id !== id));
  };

  // ✅ Table Columns
  const columns = [
    {
      name: "S No",
      selector: (row, index) => index + 1,
      width: "80px",
    },
    {
      name: "Role Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Authorizations",
      selector: (row) => row.authorizations,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center gap-3">
          <button className="text-orange-600 hover:text-orange-800">
            <Pencil size={18} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      width: "120px",
    },
  ];
  return (
    <div className="min-h-screen bg-[#FFF8F3] p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Create Role */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full md:w-1/3 self-start">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Create Role
          </h2>
          <InputField
            label={"Role Name"}
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder={"Enter Role Name"}
          />
          <ButtonComponent title={"Save"} onClick={handleAddRole}/>
        </div>

        {/* Roles Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 w-full md:w-1/2 self-start">
          <CustomTable data={roles} columns={columns} />
        </div>
      </div>
    </div>
  );
}
