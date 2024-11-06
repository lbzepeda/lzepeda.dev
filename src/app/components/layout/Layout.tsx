import React from 'react';

import { ThemeProvider } from '@/app/context/ThemeProvider';

import Navbar from '../nav-bar/Navbar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer></footer>
    </ThemeProvider>
  );
}

export default Layout;
