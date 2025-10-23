import React, { useState } from "react";

import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import DropDown from "../../../../components/Dropdown";
import ButtonComponent from "../../../../components/ButtonComponent";
import SecondaryButton from "../../../../components/SecondaryButton";


// Define dynamic permissions
const permissionConfig = {
  dashboard: ["view", "customise"],
  users: ["view", "edit", "delete"],
  reports: ["view", "export"],
  settings: ["view", "update"],
  settinhgs: ["view", "update"],
  settinghs: ["view", "update"],
  settingjs: ["view", "update"],
  settikngs: ["view", "update"],
  settlings: ["view", "update"],
};

const Authorization = () => {
  // State for sub-permission selection
  const [permissions, setPermissions] = useState(
    Object.fromEntries(
      Object.entries(permissionConfig).map(([main, subs]) => [
        main,
        Object.fromEntries(subs.map((sub) => [sub, false])),
      ])
    )
  );

  // State for open/close of sub-permissions
  const [openMain, setOpenMain] = useState({});

  // Toggle all sub-permissions of a main permission
  const handleMainToggle = (mainKey) => {
    const allSelected = Object.values(permissions[mainKey]).every(Boolean);
    const updated = Object.fromEntries(
      Object.entries(permissions[mainKey]).map(([key]) => [key, !allSelected])
    );
    setPermissions({ ...permissions, [mainKey]: updated });
  };

  // Toggle individual sub-permission
  const handleSubToggle = (mainKey, subKey) => {
    setPermissions({
      ...permissions,
      [mainKey]: {
        ...permissions[mainKey],
        [subKey]: !permissions[mainKey][subKey],
      },
    });
  };

  // Toggle open/close for main permission
  const handleToggleOpen = (mainKey) => {
    setOpenMain({ ...openMain, [mainKey]: !openMain[mainKey] });
  };

  return (
    <div className="rounded-xl shadow-sm w-full p-4">
      {/* Header with Role Dropdown and Save button */}
      <div className="flex items-center justify-between w-full gap-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 flex-1">
          <DropDown label="Role" />
        </div>
        <SecondaryButton text="Reset" />
        <ButtonComponent title="Save" />
      </div>

      {/* Permissions */}
      {Object.entries(permissions).map(([mainKey, subPerms]) => (
        <div
          key={mainKey}
          className="border border-gray-200 rounded-lg overflow-hidden mb-4"
        >
          {/* Main Permission */}
          <div className="flex justify-between items-center bg-gray-50 px-4 py-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={Object.values(subPerms).every(Boolean)}
                onChange={() => handleMainToggle(mainKey)}
                className="accent-green-600 w-4 h-4"
              />
              <span className="text-sm font-semibold text-gray-800 capitalize">
                {mainKey.replace("-", " ")}
              </span>
            </label>

            {/* Arrow button */}
            {/* Arrow button */}
            <button
              className="text-gray-500 hover:text-gray-700 transition"
              onClick={() => handleToggleOpen(mainKey)}
            >
              {openMain[mainKey] ? (
                <FiChevronUp className="h-5 w-5" />
              ) : (
                <FiChevronDown className="h-5 w-5" />
              )}
            </button>

          </div>

          {/* Sub-Permissions */}
          {openMain[mainKey] && (
            <div className="px-6 py-4 flex flex-wrap gap-4">
              {Object.entries(subPerms).map(([subKey, value]) => (
                <label
                  key={subKey}
                  className="flex items-center space-x-2 w-48 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleSubToggle(mainKey, subKey)}
                    className="accent-green-600 w-4 h-4"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {subKey.replace("-", " ")}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Authorization;
