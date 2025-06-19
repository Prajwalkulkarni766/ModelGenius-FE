import { Box, Typography } from '@mui/material';
import Layout from '../layouts/Layout';
import ProjectCard from '../components/project/ProjectCard';
import { ProjectCardProps } from '../types/Project';
import { useEffect, useState } from 'react';
import { fetchProjectsService } from '../services/projectService';
import { deleteProjectService } from "../services/projectService";

const Project = () => {

    const [projectData, setProjectData] = useState<ProjectCardProps[] | null>(null);

    const getProjects = async () => {
        try {
            const data = await fetchProjectsService();

            if (data) {
                setProjectData(data);
            }

        } catch (error) {
            console.error(error)
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
        getProjects()
    }, [])

    return (
        <Layout>
            <Typography variant="h4">Projects</Typography>

            <Box mt={5}>
                {/* {            if (!projects) return <Typography>No projects to show</Typography>;} */}
                {projectData && <ProjectCard projects={projectData} onDelete={deleteProject} />}
            </Box>
        </Layout>
    );
};

export default Project;
