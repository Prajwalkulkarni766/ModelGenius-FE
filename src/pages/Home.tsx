import { Box, Typography } from '@mui/material';
import Layout from '../layouts/Layout';
import ProjectCard from '../components/project/ProjectCard';
import { ProjectCardProps } from '../types/Project';
import { deleteProjectService, fetchLatestProjectsService } from '../services/projectService';
import { useState, useEffect } from 'react';

const Home = () => {

    const [projectData, setProjectData] = useState<ProjectCardProps[] | null>(null);

    const getProject = async () => {
        try {
            const data = await fetchLatestProjectsService()

            if (data) {
                setProjectData(data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const deleteProject = async (projectId: string) => {
        try {
            const success: boolean = await deleteProjectService(projectId)

            if (success) {
                setProjectData(prev => prev?.filter(p => p._id !== projectId) || null);
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getProject()
    }, [])

    return (
        <Layout>
            <Typography variant="h4">Welcome to ModelGenius 💖</Typography>
            <Typography component="p" mt={2}>
                Easily upload, clean, and train machine learning models in minutes.
            </Typography>

            <Box mt={7}>
                <Typography variant="h5" mb={4}>
                    Recent projects
                </Typography>
                {projectData && <ProjectCard projects={projectData} onDelete={deleteProject} />}
            </Box>
        </Layout>
    );
};

export default Home;
