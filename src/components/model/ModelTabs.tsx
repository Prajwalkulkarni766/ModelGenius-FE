import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import CodeIcon from '@mui/icons-material/Code';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`model-tabpanel-${index}`}
      aria-labelledby={`model-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `model-tab-${index}`,
    'aria-controls': `model-tabpanel-${index}`,
  };
}

const tabItems = [
  { label: 'Summary', icon: <InfoOutlinedIcon /> },
  { label: 'Train/Retrain', icon: <AutorenewIcon /> },
  { label: 'Dataset', icon: <StorageOutlinedIcon /> },
  { label: 'Code', icon: <CodeIcon /> },
  { label: 'AI Agent', icon: <SmartToyOutlinedIcon /> },
  { label: 'Export', icon: <FileDownloadOutlinedIcon /> },
];

export default function ModelTabs({
  modelInfo,
  AIAgent,
  exportModel,
  dataset,
  code,
  retrainTab,
}: {
  modelInfo: () => React.ReactNode;
  AIAgent: () => React.ReactNode;
  exportModel: () => React.ReactNode;
  dataset: () => React.ReactNode;
  code: () => React.ReactNode;
  retrainTab?: () => React.ReactNode;
}) {
  const [value, setValue] = React.useState(0);
  const [visitedTabs, setVisitedTabs] = React.useState<Set<number>>(new Set([0]));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
    setVisitedTabs(prev => {
      if (prev.has(newValue)) return prev;
      return new Set(prev).add(newValue);
    });
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Model detail tabs"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          minWidth: 220,
          height: 'calc(100vh - 100px)',
          position: 'sticky',
          top: '100px',
          bgcolor: 'background.paper',
          zIndex: 5,
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.95rem',
            minHeight: 56,
            justifyContent: 'flex-start',
            px: 3,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          },
          '& .Mui-selected': {
            bgcolor: 'action.selected',
            fontWeight: 600,
          },
          '& .MuiTabs-indicator': {
            width: 4,
            borderRadius: '0 4px 4px 0',
          },
        }}
      >
        {tabItems.map((item, index) => (
          <Tab
            key={item.label}
            icon={item.icon}
            iconPosition="start"
            label={item.label}
            {...a11yProps(index)}
            sx={{ gap: 1.5 }}
          />
        ))}
      </Tabs>

      <Box sx={{ width: '100%', p: 3, overflow: 'auto' }}>
        <CustomTabPanel value={value} index={0}>
          {visitedTabs.has(0) && modelInfo()}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {visitedTabs.has(1) && retrainTab?.()}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {visitedTabs.has(2) && dataset()}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          {visitedTabs.has(3) && code()}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          {visitedTabs.has(4) && AIAgent()}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          {visitedTabs.has(5) && exportModel()}
        </CustomTabPanel>
      </Box>
    </Box>
  );
}

