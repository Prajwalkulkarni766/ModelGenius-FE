import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import { ProjectCardProps } from '../../types/Project';
import { Link } from 'react-router';

interface ProjectCardComponentProps {
    projects: ProjectCardProps[];
    onDelete: (id: string) => void;
}

export default function ProjectCard({
    projects,
    onDelete,
}: ProjectCardComponentProps) {

    const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;

    return (
        <>
            {projects.map((project) => (
                <Card
                    sx={{ display: 'flex', width: 460, height: 160, mt: 2 }}
                    key={project._id}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                {project.projectTitle}
                            </Typography>

                            {project.updatedAt && (
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    sx={{ color: 'text.secondary' }}
                                >
                                    Last modified on:{' '}
                                    {new Date(project.updatedAt).toLocaleDateString()}
                                </Typography>
                            )}
                        </CardContent>

                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                            <Link to={`/projects/${project._id}`}>
                                <Button>Edit</Button>
                            </Link>
                            <Button
                                onClick={() => onDelete(project._id)}
                                color="error"
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>

                    {project.projectFile && (
                        <CardMedia
                            component="img"
                            sx={{ width: 151, marginLeft: 'auto' }}
                            image={`${imageBaseUrl}${project.projectFile}`}
                            alt={`${project.projectTitle} image`}
                        />
                    )}
                </Card>
            ))}
        </>
    );
}
