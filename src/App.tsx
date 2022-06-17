import { Suspense } from 'react';
import type { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/styles/ThemeProvider';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import './App.css';
import logo from './logo.svg';
import Home from './screens/Home';
import Drawer from './components/Drawer';
import theme from './theme';

const Center: FC<{ children: any }> = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      {children}
    </div>
  );
};

const Loader = () => {
  return (
    <Center>
      <img src={logo} className='App-logo' alt='logo' />
      <div>loading...</div>
    </Center>
  );
};

const MyApp = () => {
  return (
    <Drawer>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Drawer>
  );
};

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MyApp />
        </ThemeProvider>
      </StyledEngineProvider>
    </Suspense>
  );
}
