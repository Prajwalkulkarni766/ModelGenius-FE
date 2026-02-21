import { Box, Typography, Button } from '@mui/material';
import Layout from '../layouts/Layout';
import DatasetList from '../components/dataset/DatasetList';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProjectDetailsService } from '../services/projectService';
import { projectStore } from "../store/projectStore";
import { ProjectDetailsResponse } from '../types/Project';
import ModelList from '../components/wizard/ModelList';

const ProjectInfo = () => {
    const { id } = useParams();

    const { setProject } = projectStore();
const [projectDetails, setProjectDetails] = useState<ProjectDetailsResponse | null>(null);
    const [projectFetchingError, setProjectFetchingError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        let cancelled = false;

        const load = async () => {
            try {
                const data = await fetchProjectDetailsService(id);
                if (!cancelled && data) {
                    setProjectDetails(data.data);
                    setProject(data.data);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error(error);
                    setProjectFetchingError(String(error));
                }
            }
        };

        load();
        return () => { cancelled = true; };
    }, [id, setProject]);

    return (
        <Layout>
            {projectFetchingError && (
                <Typography color="error" mt={2}>
                    {projectFetchingError}
                </Typography>
            )}

            {projectDetails && (
                <>
                    <Typography variant="h4">
                        Title: {projectDetails.projectDetails.projectTitle}
                    </Typography>

                    <Typography component="p" mt={2}>
                        Description: {projectDetails.projectDetails.projectDescription}
                    </Typography>

                    <Box mt={5} display="flex" justifyContent="space-between">
                        <Typography variant="h6">Models</Typography>
                        <Button
                            component={Link}
                            to={`/projects/${projectDetails.projectDetails._id}/models/new`}
                            variant="contained"
                        >
                            Create new model
                        </Button>
                    </Box>

                    <ModelList projectId={id!} models={projectDetails.modelsRealtedToThisProject} />

                    <Box mt={5} display="flex" justifyContent="space-between">
                        <Typography variant="h6">Dataset</Typography>
                        <Button
                            component={Link}
                            to={`/projects/${projectDetails.projectDetails._id}/dataset/new`}
                            variant="contained"
                        >
                            Upload new dataset
                        </Button>
                    </Box>
                    <DatasetList projectId={id!} dataset={projectDetails.datasetRelatedToThisProject} />
                </>
            )}
        </Layout>
    );
};

export default ProjectInfo;
