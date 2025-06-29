import { Box, Typography, Button } from '@mui/material';
import Layout from '../layouts/Layout';
import ModelList from "../components/wizard/ModelList"
import { Link } from 'react-router';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProjectDetailsService } from '../services/projectService';
import { projectStore } from "../store/projectStore";
import { ProjectDetailsResponse } from '../types/Project';

const ProjectInfo = () => {

    const { id } = useParams();

    const { setProject } = projectStore();
    const [projectDetails, setProjectDetails] = useState<ProjectDetailsResponse | null>(null);
    const [projectFetchingError, setProjectFetchingError] = useState<string | null>(null);


    const getProjectDetails = async (id: string) => {
        try {
            const data = await fetchProjectDetailsService(id);
            if (data) {
                setProjectDetails(data);
                setProject(data.projectDetails);
                console.log("Project info", data)
            }

        } catch (error) {
            console.error(error)
            setProjectFetchingError("" + error)
        }
    }

    useEffect(() => {
        getProjectDetails(id);
    }, [])

    return (
        <Layout>

            {projectFetchingError && (
                <Typography color="error" mt={2}>
                    {projectFetchingError}
                </Typography>
            )}

            {projectDetails && <>

                <Typography variant="h4">Title: {projectDetails.projectDetails.projectTitle}</Typography>
                <Typography component='p' mt={2}>Description: {projectDetails.projectDetails.projectDescription}</Typography>

                <Box mt={5} display={'flex'} justifyContent={"space-between"}>
                    <Typography variant="h6">Models</Typography>
                    <Link to={"/new-model"}>
                        <Button variant="contained" >Create new model</Button>
                    </Link>
                </Box>
                <ModelList projectId={id} models={projectDetails.modelsRealtedToThisProject} />
            </>}

        </Layout>
    );
};

export default ProjectInfo;
