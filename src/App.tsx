import { memo, Suspense } from 'react';
import type { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/styles/ThemeProvider';
import './App.css';
import logo from './logo.svg';
import Home from './screens/Home';
import Drawer from './components/Drawer';
import theme from './theme';
import Box from '@mui/material/Box';

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

const MyApp = memo(
  () => {
    return (
      <Drawer>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Drawer>
    );
  },
  () => true
);
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loader />}>
        <CssBaseline />
        <MyApp />
      </Suspense>
    </ThemeProvider>
  );
}
