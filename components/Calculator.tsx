import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { evaluate } from 'mathjs';

export default function Calculator() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [expression, setExpression] = useState('');

    const handleClick = (value: string) => {
        if (value === 'C') {
            setExpression('');
            return;
        }

        if (value === '=') {
            try {
                const result = evaluate(expression);
                setExpression(result.toString());
            } catch {
                setExpression('Error');
            }
            return;
        }

        setExpression((prev) => prev + value);
    };

    const numericButtons = [
        ['7', '8', '9', '/'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['0', '.', '=', '+'],
        ['C', '(', ')', '^'],
    ];

    const scientificButtons = ['sin', 'cos', 'tan', 'log', 'sqrt', 'pi', 'e'];
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('calc-history');
        if (stored) {
            setHistory(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('calc-history', JSON.stringify(history));
    }, [history]);

    if (value === '=') {
        try {
            const result = evaluate(expression);
            setHistory((prev) => [expression + ' = ' + result, ...prev]);
            setExpression(result.toString());
        } catch {
            setExpression('Error');
        }
        return;
    }
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
            <Grid container spacing={1} sx={{ mb: 2 }}>
                {scientificButtons.map((btn, index) => (
                    <Grid item xs={4} sm={2} key={index}>
                        <Button fullWidth variant="outlined" onClick={() => handleClick(`${btn}(`)}>
                            {btn}
                        </Button>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Numbers & Operators
            </Typography>
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
            <Grid container spacing={1}>
                {numericButtons.flat().map((btn, index) => (
                    <Grid item xs={3} key={index}>
                        <Button fullWidth variant="contained" onClick={() => handleClick(btn)}>
                            {btn}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}