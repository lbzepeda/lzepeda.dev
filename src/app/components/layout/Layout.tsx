import React from 'react';

import { ThemeProvider } from '@/app/context/ThemeProvider';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <header>
        <nav></nav>
      </header>
      <main>{children}</main>
      <footer></footer>
    </ThemeProvider>
  );
}

export default Layout;
