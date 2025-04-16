import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    useTheme,
    useMediaQuery,
  } from '@mui/material';
  import { useState } from 'react';
  
  export default function Calculator() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [expression, setExpression] = useState('');
  
    return (
      <Box
        sx={{
          maxWidth: 500,
          mx: 'auto',
          mt: 6,
          p: 3,
          boxShadow: 4,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Scientific Calculator
        </Typography>
  
        <Box display="flex" alignItems="center" gap={1} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            value={expression}
            inputProps={{ readOnly: true }}
          />
          <Button variant="outlined" onClick={() => setExpression('')}>
            Clear
          </Button>
        </Box>
      </Box>
    );
  }