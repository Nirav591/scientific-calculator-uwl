import Head from 'next/head';
import Calculator from '../components/Calculator';
import { Box, IconButton, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export default function Home({ toggleMode, currentMode }: any) {
  return (
    <>
      <Head>
        <title>Scientific Calculator</title>
      </Head>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={toggleMode} color="inherit">
            {currentMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
        <Calculator />
      </Box>
    </>
  );
}