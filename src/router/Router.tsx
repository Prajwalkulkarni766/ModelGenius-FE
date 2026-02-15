import { Routes, Route } from "react-router";
import { HashRouter } from "react-router-dom";

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import NewProject from "../pages/NewProject";
import Setting from '../pages/Setting';
import Project from "../pages/Project";
import Dataset from '../pages/Dataset';
import ProjectInfo from "../pages/ProjectInfo";
import NewModelWizard from "../pages/NewModelWizard";
import ModelInfo from '../pages/ModelInfo';
import ForgotPassword from '../pages/ForgotPassword';
import ModelDetails from "../pages/ModelDetailsPage";
import ComingSoon from "../pages/ComingSoon";

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        <Route path='/home' element={<Home />} />
        <Route path='/ai-agent' element={<ComingSoon />} />
        <Route path='/setting' element={<Setting />} />

        <Route path='/projects' element={<Project />} />
        <Route path='/projects/new' element={<NewProject />} />
        <Route path='/projects/:id' element={<ProjectInfo />} />

        <Route path='/projects/:projectId/models/new' element={<NewModelWizard />} />
        <Route path='/projects/:projectId/models/:modelId' element={<ModelInfo />} />

        <Route path='/projects/:projectId/dataset/new' element={<Dataset />} />


        <Route path='/projects/:projectId/model-details/:modelId' element={<ModelDetails />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
