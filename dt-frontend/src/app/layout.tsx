'use client';

import { store } from "@/store";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import "@/styles/globals.css";
import { RootState } from "@/store";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <title>My Dashboard</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ReduxProvider store={store}>
          <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <MainContent>{children}</MainContent>
            </div>
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
