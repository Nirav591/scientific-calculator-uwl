import { AppProps } from 'next/app';
import { useMemo, useState } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { PaletteMode } from '@mui/material';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<PaletteMode>('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
          },
        },
      }),
    [mode]
  );

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} toggleMode={toggleMode} currentMode={mode} />
    </ThemeProvider>
  );
}