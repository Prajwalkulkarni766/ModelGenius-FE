import { Box, Typography, Button } from '@mui/material';
import Layout from '../layouts/Layout';
import DatasetList from '../components/dataset/DatasetList';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProjectDetailsService, updateProjectService } from '../services/projectService';
import { projectStore } from "../store/projectStore";
import { ProjectDetailsResponse } from '../types/Project';
import ModelList from '../components/wizard/ModelList';
import EditableText from '../components/EditableText';

const ProjectInfo = () => {
    const { id } = useParams();

    const { setProject } = projectStore();
    const [projectDetails, setProjectDetails] = useState<ProjectDetailsResponse | null>(null);
    const [projectFetchingError, setProjectFetchingError] = useState<string | null>(null);

    const refreshProject = async () => {
        if (!id) return;
        try {
            const data = await fetchProjectDetailsService(id);
            if (data) {
                setProjectDetails(data.data);
                setProject(data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateTitle = async (newTitle: string) => {
        await updateProjectService(id!, { projectTitle: newTitle });
        await refreshProject();
    };

    const handleUpdateDescription = async (newDescription: string) => {
        await updateProjectService(id!, { projectDescription: newDescription });
        await refreshProject();
    };

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
                    <EditableText
                        value={projectDetails.projectDetails.projectTitle}
                        onSave={handleUpdateTitle}
                        variant="h4"
                    />

                    <Box mt={2}>
                        <EditableText
                            value={projectDetails.projectDetails.projectDescription}
                            onSave={handleUpdateDescription}
                            variant="body1"
                            multiline
                        />
                    </Box>

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
