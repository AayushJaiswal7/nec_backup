import Breadcrumb from "../../components/BreadCrumb";

import { PillTabs } from "../../components/Tab";
import { Outlet } from "react-router-dom";

function Master() {
   const items = [
      { label: "Master Data", href: "/master" },
    
   ];
   const handleBackRoute = () => {
      console.log("Going back...");
      alert("Back button clicked!");
   };
   return (
      <>
         <Breadcrumb items={items} onBackRoute={handleBackRoute} />
         <div className="max-w-full ">
            <PillTabs
               basePath="/master"
               items={[
                  { label: "Project Master", value: "projectmaster", path: "project-master" },
                  {
                     label: "BOQ Master",
                     value: "boqmaster",
                     path: "boq-master",
                  },
                  { label: "Purchase Master", value: "purchasemaster", path: "purchase-master" },
                  {
                     label: "Petty CashMaster",
                     value: "pettycashmaster",
                     path: "petty-cashmaster",
                  },
                  
               ]}
            />
            <Outlet />
         </div>
      </>
   );
}

export default Master;
