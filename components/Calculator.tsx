import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { evaluate } from 'mathjs';

const numericButtons = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
  ['C', '(', ')', '^'],
];

const scientificButtons = ['sin', 'cos', 'tan', 'log', 'sqrt', 'pi', 'e'];

export default function Calculator() {
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const stored = localStorage.getItem('calc-history');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calc-history', JSON.stringify(history));
  }, [history]);

  const handleClick = (value: string) => {
    if (value === 'C') {
      setExpression('');
      return;
    }

    if (value === '=') {
      try {
        const result = evaluate(expression);
        setHistory((prev) => [`${expression} = ${result}`, ...prev.slice(0, 9)]);
        setExpression(result.toString());
      } catch {
        setExpression('Error');
      }
      return;
    }

    setExpression((prev) => prev + (value === 'pi' ? 'pi' : value));
  };

  const renderButtonRow = (row: string[]) => (
    <Box display="flex" gap={1} mb={1} flexWrap="wrap">
      {row.map((btn, idx) => (
        <Button
          key={idx}
          variant="contained"
          fullWidth
          onClick={() => handleClick(btn)}
          sx={{
            flex: `1 1 ${isMobile ? '22%' : '18%'}`,
            minWidth: 60,
            minHeight: 50,
          }}
        >
          {btn}
        </Button>
      ))}
    </Box>
  );

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

      <Typography variant="subtitle1" gutterBottom>
        Scientific Functions
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        {scientificButtons.map((btn, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => handleClick(`${btn}(`)}
            sx={{
              flex: `1 1 ${isMobile ? '30%' : '18%'}`,
              minWidth: 60,
              minHeight: 45,
            }}
          >
            {btn}
          </Button>
        ))}
      </Box>

      {history.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            History
          </Typography>
          <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
            {history.map((item, i) => (
              <Typography
                key={i}
                variant="body2"
                sx={{ cursor: 'pointer', mb: 1 }}
                onClick={() => setExpression(item.split('=')[0].trim())}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      )}

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Numbers & Operators
      </Typography>
      {numericButtons.map((row, i) => (
        <React.Fragment key={i}>{renderButtonRow(row)}</React.Fragment>
      ))}
    </Box>
  );
}