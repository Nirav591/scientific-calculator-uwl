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
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Numbers & Operators
            </Typography>
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