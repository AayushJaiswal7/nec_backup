// src/pages/petty-cash/PettyCash.jsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/BreadCrumb';
import CardComponent from '../../components/CardComponent';
import { SquarePen, ClipboardList } from 'lucide-react';

function PettyCash() {
  const navigate = useNavigate();
  const breadcrumbItems = [{ label: 'Petty Cash' }];

  const handleNavigateEntry = () => alert('Navigate to Petty Cash Entry (Not implemented yet)');
  const handleNavigateRegister = () => {
    // Correct navigation path for the separate route
    navigate('/petty-cash/register');
  };

  return (
   <div className="p-4 space-y-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex flex-wrap gap-4">
         <CardComponent title="Petty Cash Entry" icon={SquarePen} onClick={handleNavigateEntry} />
         <CardComponent title="Petty Cash Register" icon={ClipboardList} onClick={handleNavigateRegister} />
      </div>

      {/* Outlet to render child routes like the Register table */}
      <div className="mt-6"> 
        <Outlet />
      </div>

    </div>
  );
}
export default PettyCash;