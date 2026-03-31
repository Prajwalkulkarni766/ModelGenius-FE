import { Routes, Route } from "react-router";
import { HashRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { CircularProgress, Box } from "@mui/material";

const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const Home = lazy(() => import('../pages/Home'));
const NewProject = lazy(() => import("../pages/NewProject"));
const Setting = lazy(() => import('../pages/Setting'));
const Project = lazy(() => import("../pages/Project"));
const Dataset = lazy(() => import('../pages/Dataset'));
const ProjectInfo = lazy(() => import("../pages/ProjectInfo"));
const NewModelWizard = lazy(() => import("../pages/NewModelWizard"));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const ModelDetails = lazy(() => import("../pages/ModelDetailsPage"));
const NotFound = lazy(() => import("../pages/NotFound"));
const AIAgentList = lazy(() => import("../pages/AIAgentList"));
import ProtectedRoute from "../components/ProtectedRoute";

const AppRouter = () => {
  return (
    <HashRouter>
      <Suspense fallback={
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      }>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<Home />} />
            <Route path='/ai-agent' element={<AIAgentList />} />
            <Route path='/setting' element={<Setting />} />

            <Route path='/projects' element={<Project />} />
            <Route path='/projects/new' element={<NewProject />} />
            <Route path='/projects/:id' element={<ProjectInfo />} />

            <Route path='/projects/:projectId/models/new' element={<NewModelWizard />} />
            <Route path='/projects/:projectId/models/:modelId' element={<ModelDetails />} />

            <Route path='/projects/:projectId/dataset/new' element={<Dataset />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default AppRouter;
