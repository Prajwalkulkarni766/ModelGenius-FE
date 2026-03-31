import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Chip, Skeleton } from '@mui/material';
import Layout from '../layouts/Layout';
import { getAiAgentsService, AiAgent } from '../services/modelService';
import { styled } from '@mui/material/styles';

const ClampedTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
});

const AIAgentList = () => {
    const [agents, setAgents] = useState<AiAgent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const data = await getAiAgentsService();
                setAgents(data);
            } catch (error) {
                console.error(error);
                setError("Failed to load AI agents.");
            } finally {
                setLoading(false);
            }
        };
        fetchAgents();
    }, []);

    return (
        <Layout>
            <Typography variant="h4">AI Agents</Typography>

            {error && (
                <Typography color="error" mt={2}>
                    {error}
                </Typography>
            )}

            <Box mt={5}>
                {loading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} variant="rectangular" width={460} height={140} sx={{ borderRadius: 2 }} />
                        ))}
                    </Box>
                ) : agents.length === 0 ? (
                    <Typography>No AI agents available</Typography>
                ) : (
                    agents.map((agent) => (
                        <Card
                            sx={{ display: 'flex', width: 460, minHeight: 140, mt: 2 }}
                            key={agent.id}
                        >
                            <CardContent sx={{ flex: 1, minWidth: 0 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Typography component="div" variant="h5">
                                        {agent.name}
                                    </Typography>
                                    {agent.free && <Chip label="Free" size="small" color="success" />}
                                </Box>
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    sx={{ color: 'text.secondary', mb: 1 }}
                                >
                                    {agent.provider}
                                </Typography>
                                <ClampedTypography variant="body2" color="text.secondary">
                                    {agent.description}
                                </ClampedTypography>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>
        </Layout>
    );
};

export default AIAgentList;
