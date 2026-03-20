import { Box, Typography } from '@mui/material';
import Layout from '../layouts/Layout';
import ProjectCard from '../components/project/ProjectCard';
import { ProjectCardProps } from '../types/Project';
import { useEffect, useState } from 'react';
import { fetchProjectsService, deleteProjectService } from '../services/projectService';
import { useSnackbar } from '../hooks/useSnackbar';
import { useAsyncAction } from '../hooks/useAsyncAction';

const Project = () => {

    const [projectData, setProjectData] = useState<ProjectCardProps[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { showSnackbar } = useSnackbar();
    const { execute, loading } = useAsyncAction();

    const getProjects = async () => {
        try {
            const data = await fetchProjectsService();

            if (data) {
                setProjectData(data.data);
            }

        } catch (error) {
            console.error(error)
            setError("Failed to load projects. Please try again.");
            showSnackbar("Failed to load projects. Please try again.", "error");
        }
    }

    const deleteProject = async (projectId: string) => {
        await execute(async () => {
            const success: boolean = await deleteProjectService(projectId)

            if (success) {
                showSnackbar("Project deleted successfully!", "success");
                setProjectData(prev => prev?.filter(p => p._id !== projectId) || null);
            } else {
                showSnackbar("Failed to delete project.", "error");
            }
        });
    }

    useEffect(() => {
        getProjects()
    }, [])

    return (
        <Layout>
            <Typography variant="h4">Projects</Typography>

            {error && (
                <Typography color="error" mt={2}>
                    {error}
                </Typography>
            )}

            <Box mt={5}>
                {!projectData || projectData.length === 0 ? (
                    <Typography>No projects to show</Typography>
                ) : (
                    <ProjectCard
                        projects={projectData}
                        onDelete={deleteProject}
                        loading={loading}
                    />
                )}
            </Box>

        </Layout>
    );
};

export default Project;
