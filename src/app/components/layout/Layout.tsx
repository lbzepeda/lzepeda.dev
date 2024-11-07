import React from 'react';

import { ThemeProvider } from '@/app/context/ThemeProvider';

import Footer from '../footer/Footer';
import Navbar from '../nav-bar/Navbar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
}

export default Layout;
