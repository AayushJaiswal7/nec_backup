import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard/dashboard";
import ProtectedLayout from "./pages/layout/ProtectedLayout";
import NotFound from "./components/NotFound";
import Admin from "./pages/admin/admin";
import Login from "./pages/login/login";
import AddUser from "./pages/admin/screens/UserMaster/UserAdd";
import AddSite from "./pages/admin/screens/Sites/addSite";
import ProjectDetails from "./pages/project/screens/ProjectDetails";
import SiteMaster from "./pages/admin/screens/Sites/siteMaster";
import ProjectCard from "./components/ProjectCard";
import Roles from "./pages/admin/screens/Roles/roles";
import Authorization from "./pages/admin/screens/Authorization/Authorization";
import UserMaster from "./pages/admin/screens/UserMaster/UserMaster";
import Project from "././pages/project/project"
import Master from "./pages/master/master";//included master page
import BoqMaster from "./pages/master/screens/BOQMaster/BoqMaster";//added to use boqmaster
import ViewBOQ from "./pages/master/screens/BOQMaster/ViewBOQ";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        {/*  Admin Routes */}
        <Route path="admin" element={<Admin />}>
          <Route path="approvals" element={<ProjectCard />} />
          <Route index path="user-master" element={<UserMaster />} />
          <Route path="add-user" element={<AddUser/>}/>
          <Route path="roles" element={<Roles />} />
          <Route path="authorizations" element={<Authorization />} />
          <Route path="site" element={<SiteMaster />} />
          <Route path="add-site" element={<AddSite />} />
          <Route path="*" element={<NotFound />} />
        </Route>

       <Route path="master" element={<Master/>}>//master page route
         
          <Route path="boq-master" element={<BoqMaster />} /> 
          <Route path="boq-master/view/:boqId" element={<ViewBOQ />} />
          <Route path="*" element={<NotFound />} /> 
          
        </Route>

        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
        <Route path="project" element={<Project />}>
          {/* <Route index element={<Project />} /> */}
          <Route path="project-details" element={<ProjectDetails />} />
        </Route>
        <Route path="project-details" element={<ProjectDetails />} />



      </Route>

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
