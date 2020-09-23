import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ProfilePhotos from './ProfilePhotos';
import ProfileDescription from './ProfileDescription';
import ProfileFollowings from './ProfileFollowings';
import ProfileActivities from './ProfileActivities';


interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  cssClass: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, cssClass, ...other } = props;

  return (
    <div
      role="tabpanel"
      className={cssClass}
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'auto',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 200
  },
  panel: {
    flexGrow: 1
  },
}));

const ProfileContent = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Player Profile tabs"
        className={classes.tabs}
      >
        <Tab label="About" {...a11yProps(0)} />
        <Tab label="Photos" {...a11yProps(1)} />
        <Tab label="Activities" {...a11yProps(2)} />
        <Tab label="Followers" {...a11yProps(3)} />
        <Tab label="Following" {...a11yProps(4)} />
      </Tabs>
      <TabPanel cssClass={classes.panel} value={value} index={0}>
        <ProfileDescription />
      </TabPanel>
      <TabPanel cssClass={classes.panel} value={value} index={1}>
        <ProfilePhotos />
      </TabPanel>
      <TabPanel cssClass={classes.panel} value={value} index={2}>
        <ProfileActivities />
      </TabPanel>
      <TabPanel cssClass={classes.panel} value={value} index={3}>
        <ProfileFollowings />
      </TabPanel>
      <TabPanel cssClass={classes.panel} value={value} index={4}>
        <ProfileFollowings />
      </TabPanel>      
    </div>
  );
}
export default ProfileContent;
