'use client';

import { store } from "@/store";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import { RootState } from "@/store";

import "@fontsource/inter/index.css"; // Inter variable font
import "@fontsource/archivo/700.css"; // Archivo Bold
import "@/styles/globals.css";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <title>My Dashboard</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="flex">
        <ReduxProvider store={store}>
          <Sidebar />
          <div className="flex flex-col flex-1 h-screen">
            <Header />
            <MainContent>{children}</MainContent>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}

function MainContent({ children }: { children: React.ReactNode }) {
  const isOpen = useSelector((state: RootState) => state.drawer.isDrawerOpen);

  return (
    <main
      id="main-content"
      className={`flex-1 mt-12 ${
        isOpen ? "px-8" : "px-10"
      } md:p-8 overflow-auto transition-all duration-300`}
    >
      {children}
    </main>
  );
}
