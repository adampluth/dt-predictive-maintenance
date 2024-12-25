'use client';

import { useDispatch } from "react-redux";
import { closeDrawer, openDrawer } from "@/store/slices/drawerSlice";
import useLocalStorageState from "use-local-storage-state";
import Link from "next/link";
import ToggleSidebarButton from "./ui/ToggleSidebarButton";

const sections = [
  { name: "Home", path: "/" },
  { name: "Monitoring & Analytics", path: "/monitoring" },
  { name: "Data Streaming", path: "/data-streaming" },
  { name: "Anomaly Detection", path: "/anomaly-detection" },
  { name: "Reports", path: "/reports" },
  { name: "System Health", path: "/system-health" },
  { name: "MBSE", path: "/mbse" },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useLocalStorageState("isDrawerOpen", {
    defaultValue: false,
  });

  const toggleDrawer = () => {
    if (isOpen) {
      setIsOpen(false);
      dispatch(closeDrawer());
    } else {
      setIsOpen(true);
      dispatch(openDrawer());
    }
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`h-screen bg-gray-800 text-white shadow-lg transition-transform duration-300 ${
          isOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        {isOpen && (
          <nav className="mt-24 space-y-2 px-4">
            {sections.map((section) => (
              <Link key={section.name} href={section.path}>
                <span
                  onClick={() => {
                    setIsOpen(true); // Keeps sidebar open
                    dispatch(openDrawer());
                  }}
                  className="block py-2 text-lg hover:text-blue-400 cursor-pointer"
                >
                  {section.name}
                </span>
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Toggle Button */}
      <div className={`fixed top-12 ${isOpen ? "left-2" : "left-2"}`}>
        <ToggleSidebarButton isOpen={isOpen} toggleDrawer={toggleDrawer} />
      </div>
    </div>
  );
}
