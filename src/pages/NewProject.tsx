import { Typography } from "@mui/material";
import NewProjectForm from "../components/project/NewProjectForm";
import Layout from "../layouts/Layout";

const NewProject = () => {
    return (
        <Layout>
            <Typography variant={'h4'} mb={2}>New Project</Typography>
            <NewProjectForm />
        </Layout>

    )
}

export default NewProject;