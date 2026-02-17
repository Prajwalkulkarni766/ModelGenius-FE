import { Box, Typography } from '@mui/material';
import Layout from '../layouts/Layout';
import ProjectCard from '../components/project/ProjectCard';
import { ProjectCardProps } from '../types/Project';
import { useEffect, useState } from 'react';
import { fetchProjectsService } from '../services/projectService';
import { deleteProjectService } from "../services/projectService";
import { useSnackbar } from '../hooks/useSnackbar';

const Project = () => {

    const [projectData, setProjectData] = useState<ProjectCardProps[] | null>(null);
    const { showSnackbar } = useSnackbar();

    const getProjects = async () => {
        try {
            const data = await fetchProjectsService();

            if (data) {
                setProjectData(data.data);
            }

        } catch (error) {
            console.error(error)
        }
    }

    const deleteProject = async (projectId: string) => {
        try {
            const success: boolean = await deleteProjectService(projectId)

            if (success) {
                showSnackbar("Project deleted successfully!", "success");
                setProjectData(prev => prev?.filter(p => p._id !== projectId) || null);
            } else {
                showSnackbar("Failed to delete project.", "error");
            }
        } catch (error) {
            console.error(error)
            showSnackbar("Failed to delete project.", "error");
        }
    }

    useEffect(() => {
        getProjects()
    }, [])

    return (
        <Layout>
            <Typography variant="h4">Projects</Typography>

            <Box mt={5}>
                {!projectData || projectData.length === 0 ? (
                    <Typography>No projects to show</Typography>
                ) : (
                    <ProjectCard
                        projects={projectData}
                        onDelete={deleteProject}
                    />
                )}
            </Box>

        </Layout>
    );
};

export default Project;
