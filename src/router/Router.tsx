import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import NewProject from "../pages/NewProject";
import Setting from '../pages/Setting';
import Project from "../pages/Project";
// import Dataset from '../pages/Dataset';
import ProjectInfo from "../pages/ProjectInfo";
import NewModelWizard from "../pages/NewModelWizard";
import ModelInfo from '../pages/ModelInfo';
import ForgotPassword from '../pages/ForgotPassword';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/new-project' element={<NewProject />} />
        <Route path='/project' element={<Project />} />
        {/* <Route path='/dataset' element={<Dataset />} /> */}
        <Route path='/project-info/:id' element={<ProjectInfo />} />
        <Route path='/new-model' element={<NewModelWizard />} />
        <Route path='/model-info' element={<ModelInfo />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
