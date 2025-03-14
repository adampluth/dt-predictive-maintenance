"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

interface TabsProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  defaultValue: string;
  onValueChange?: (value: string) => void;
}

const validTabs = ["monitoring", "analytics", "cybersecurity", "streaming"];

const Tabs = ({ defaultValue, onValueChange, children, ...props }: TabsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // Extract active tab from URL
  let activeValue = pathname?.split("/").pop();
  if (!activeValue || !validTabs.includes(activeValue)) {
    activeValue = defaultValue;
  }

  // Fix: Correct `setActiveValue` implementation
  const setActiveValue = React.useCallback(
    (value: string) => {
      router.push(`/dashboard/${value}`);
      if (onValueChange) onValueChange(value);
    },
    [router, onValueChange]
  );

  // Provide context to child components
  const contextValue = React.useMemo(
    () => ({ activeValue, setActiveValue }),
    [activeValue, setActiveValue]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className="tabs tabs-boxed flex flex-col bg-base-300 p-2 rounded-xl" {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsContext = React.createContext<{
  activeValue: string;
  setActiveValue: (value: string) => void;
} | null>(null);

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
};

interface TabsListProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

const TabsList = ({ children, ...props }: TabsListProps) => {
  return (
    <div className="tabs w-full flex justify-start" {...props}>
      {children}
    </div>
  );
};

interface TabsTriggerProps extends React.ComponentProps<"button"> {
  value: string;
}

const TabsTrigger = ({
  value,
  children,
  className = "",
  ...props
}: TabsTriggerProps) => {
  const { activeValue, setActiveValue } = useTabsContext();

  return (
    <button
      className={`tab transition px-4 py-2 text-sm font-medium cursor-pointer rounded-t-lg ${
        activeValue === value ? "tab-active bg-primary text-primary-content shadow-md" : "hover:bg-base-200"
      } ${className}`}
      role="tab"
      aria-selected={activeValue === value}
      onClick={() => setActiveValue(value)}
      {...props}
    >
      {children}
    </button>
  );
};

interface TabsContentProps extends React.ComponentProps<"div"> {
  value: string;
  children: React.ReactNode;
}

const TabsContent = ({
  value,
  children,
  className = "",
  ...props
}: TabsContentProps) => {
  const { activeValue } = useTabsContext();

  return (
    <div
      className={`tab-content p-4 bg-base-200 rounded-lg shadow-md transition-opacity duration-300 ${
        activeValue === value ? "block opacity-100" : "hidden opacity-0"
      } ${className}`}
      role="tabpanel"
      {...props}
    >
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
