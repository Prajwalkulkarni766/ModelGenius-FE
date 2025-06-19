import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ReactNode } from 'react';

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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ModelTabs({
  modelInfo,
  AIAgent,
  exportModel,
  dataset,
}: {
  modelInfo: ReactNode;
  AIAgent: ReactNode;
  exportModel: ReactNode;
  dataset: ReactNode;
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Model Information" {...a11yProps(0)} />
          <Tab label="Dataset" {...a11yProps(1)} />
          <Tab label="AI Agent" {...a11yProps(2)} />
          <Tab label="Export" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {modelInfo}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {dataset}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {AIAgent}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {exportModel}
      </CustomTabPanel>
    </Box>
  );
}
