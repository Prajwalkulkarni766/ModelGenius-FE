import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ProjectListProps } from '../../types/Project';
import { Link } from "react-router"

interface ProjectCardPropsWithDelete extends ProjectListProps {
    onDelete: (id: string) => void;
}

export default function ProjectCard({ projects = [], onDelete }: ProjectCardPropsWithDelete) {
    return (
        <>
            {projects.map((project) => (
                <Card sx={{ display: 'flex', width: 560, height: 160, mt: 2 }} key={project._id}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                {project.projectTitle}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ color: 'text.secondary' }}
                            >
                                Last moified on: {new Date(project.updatedAt).toLocaleDateString()}
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                            <Link to={`/project-info/${project._id}`}>
                                <Button>Edit</Button>
                            </Link>
                            <Button onClick={() => onDelete(project._id)} color='error'>
                                Delete
                            </Button>
                        </Box>
                    </Box>
                    {project.projectFile && <CardMedia
                        component="img"
                        sx={{ width: 151, marginLeft: "auto", borderRadius: 'auto' }}
                        image={`${import.meta.env.VITE_IMAGE_BASE_URL}${project.projectFile}`}
                        alt={`${project.projectTitle} image`}
                    />}
                </Card>
            ))}

        </>
    );
}
