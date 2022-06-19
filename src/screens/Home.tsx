import Box from '@mui/material/Box';
import { memo } from 'react';
import { Announcements, Community, JobsList } from '../components/List';

/**
 * Home
 */
const Home = memo(() => {
  return (
    <Box sx={{ display: 'block' }}>
      <JobsList />
      <Announcements />
      <Community />
    </Box>
  );
});

export default Home;
