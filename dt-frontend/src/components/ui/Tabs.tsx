import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps extends React.ComponentProps<"div"> {
  defaultValue: string;
  children: React.ReactNode;
}

const Tabs = ({ defaultValue, children, className, ...props }: TabsProps) => {
  const [activeValue, setActiveValue] = React.useState(defaultValue);

  const contextValue = React.useMemo(
    () => ({ activeValue, setActiveValue }),
    [activeValue]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn("tabs", className)} {...props}>
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

const TabsList = ({ children, className, ...props }: TabsListProps) => {
  return (
    <div className={cn("flex space-x-4", className)} {...props}>
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
  className,
  ...props
}: TabsTriggerProps) => {
  const { activeValue, setActiveValue } = useTabsContext();

  return (
    <button
      className={cn(
        "px-3 py-1 text-sm font-medium",
        activeValue === value
          ? "bg-primary text-primary-foreground rounded-t-lg"
          : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700",
        className
      )}
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
  className,
  ...props
}: TabsContentProps) => {
  const { activeValue } = useTabsContext();

  if (value !== activeValue) return null;

  return (
    <div className={cn("mt-4", className)} {...props}>
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
