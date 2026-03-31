import { Box, Typography, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Layout from '../layouts/Layout';
import DatasetList from '../components/dataset/DatasetList';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { fetchProjectDetailsService, updateProjectService, deleteProjectService } from '../services/projectService';
import { projectStore } from "../store/projectStore";
import { ProjectDetailsResponse } from '../types/Project';
import ModelList from '../components/wizard/ModelList';
import EditProjectModal from '../components/project/EditProjectModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { useSnackbar } from '../hooks/useSnackbar';
import { useAsyncAction } from '../hooks/useAsyncAction';

const ProjectInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    const { setProject, clearProject } = projectStore();
    const [projectDetails, setProjectDetails] = useState<ProjectDetailsResponse | null>(null);
    const [projectFetchingError, setProjectFetchingError] = useState<string | null>(null);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const { execute: executeUpdate, loading: updateLoading } = useAsyncAction();
    const { execute: executeDelete, loading: deleteLoading } = useAsyncAction();
    const deleteGuardRef = useRef(false);

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
            setProjectFetchingError(String(error));
        }
    };

    const handleUpdateProject = async (title: string, description: string) => {
        await executeUpdate(async () => {
            const success = await updateProjectService(id!, { projectTitle: title, projectDescription: description });
            if (success) {
                showSnackbar('Project updated successfully!', 'success');
                await refreshProject();
                setEditModalOpen(false);
            } else {
                showSnackbar('Failed to update project. Please try again.', 'error');
            }
        });
    };

    const handleDeleteProject = async () => {
        if (deleteGuardRef.current || deleteLoading || !id) return;
        deleteGuardRef.current = true;
        await executeDelete(async () => {
            const success = await deleteProjectService(id);
            if (success) {
                showSnackbar('Project deleted successfully!', 'success');
                clearProject();
                navigate('/projects');
            } else {
                showSnackbar('Failed to delete project. Please try again.', 'error');
            }
            setDeleteDialogOpen(false);
            deleteGuardRef.current = false;
        });
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
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="h4">
                                {projectDetails.projectDetails.projectTitle}
                            </Typography>
                            <IconButton onClick={() => setEditModalOpen(true)} size="small">
                                <EditIcon />
                            </IconButton>
                        </Box>
                        {/* <Button
                            color="error"
                            variant="outlined"
                            onClick={() => setDeleteDialogOpen(true)}
                        >
                            Delete Project
                        </Button> */}
                    </Box>

                    <Box mt={2}>
                        <Typography variant="body1">
                            {projectDetails.projectDetails.projectDescription}
                        </Typography>
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

                    <EditProjectModal
                        open={editModalOpen}
                        initialTitle={projectDetails.projectDetails.projectTitle}
                        initialDescription={projectDetails.projectDetails.projectDescription}
                        loading={updateLoading}
                        onSave={handleUpdateProject}
                        onCancel={() => setEditModalOpen(false)}
                    />

                    <ConfirmDialog
                        open={deleteDialogOpen}
                        title="Delete Project"
                        message={`Are you sure you want to delete "${projectDetails.projectDetails.projectTitle}"? This action cannot be undone.`}
                        confirmText="Delete"
                        cancelText="Cancel"
                        confirmColor="error"
                        loading={deleteLoading}
                        onConfirm={handleDeleteProject}
                        onCancel={() => setDeleteDialogOpen(false)}
                    />
                </>
            )}
        </Layout>
    );
};

export default ProjectInfo;
