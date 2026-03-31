import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    Grid,
} from '@mui/material';
import { ProjectCardProps } from '../../types/Project';
import { Link } from 'react-router';
import { useState, useRef } from 'react';
import ConfirmDialog from '../ConfirmDialog';

interface ProjectCardComponentProps {
    projects: ProjectCardProps[];
    onDelete: (id: string) => void;
    loading?: boolean;
}

export default function ProjectCard({
    projects,
    onDelete,
    loading = false,
}: ProjectCardComponentProps) {
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
    const deleteGuardRef = useRef(false);

    const handleDeleteClick = (id: string) => {
        setDeleteTargetId(id);
    };

    const handleConfirmDelete = () => {
        if (deleteGuardRef.current || loading || !deleteTargetId) return;
        deleteGuardRef.current = true;
        onDelete(deleteTargetId);
        setDeleteTargetId(null);
        setTimeout(() => { deleteGuardRef.current = false; }, 300);
    };

    const handleCancelDelete = () => {
        setDeleteTargetId(null);
    };

    const targetProject = projects.find(p => p._id === deleteTargetId);

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
                                onClick={() => handleDeleteClick(project._id)}
                                color="error"
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Card>
            ))}

            <ConfirmDialog
                open={!!deleteTargetId}
                title="Delete Project"
                message={`Are you sure you want to delete "${targetProject?.projectTitle || 'this project'}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                confirmColor="error"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </>
    );
}
