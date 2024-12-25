'use client';

import React from 'react';
import { useDispatch } from "react-redux";
import { closeDrawer, openDrawer } from "@/store/slices/drawerSlice";
import useLocalStorageState from "use-local-storage-state";
import Link from "next/link";
import ToggleSidebarButton from "./ui/ToggleSidebarButton";
import { usePathname } from "next/navigation";
import { FiHome, FiTrendingUp, FiServer, FiAlertTriangle, FiFileText, FiActivity, FiSettings } from "react-icons/fi";

const sections = [
  { name: "Home", path: "/", icon: FiHome },
  { name: "Monitoring & Analytics", path: "/monitoring", icon: FiTrendingUp, subRoutes: [
      { name: "Streaming", path: "/monitoring/streaming" },
      { name: "Analytics", path: "/monitoring/analytics" },
    ],
  },
  { name: "Data Streaming", path: "/data-streaming", icon: FiServer },
  { name: "Anomaly Detection", path: "/anomaly-detection", icon: FiAlertTriangle },
  { name: "Reports", path: "/reports", icon: FiFileText },
  { name: "System Health", path: "/system-health", icon: FiActivity },
  { name: "MBSE", path: "/mbse", icon: FiSettings },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const pathname = usePathname();
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

  const isActive = (path: string) => pathname === path;

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
              <div key={section.name}>
                <Link href={section.path}>
                  <span
                    onClick={() => {
                      setIsOpen(true); // Keeps sidebar open
                      dispatch(openDrawer());
                    }}
                    className={`flex items-center space-x-2 py-2 px-2 text-sm rounded-lg transition ${
                      isActive(section.path)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    {React.createElement(section.icon, { className: "h-4 w-4" })}
                    <span>{section.name}</span>
                  </span>
                </Link>
                {/* Sub-navigation for Monitoring */}
                {section.subRoutes && pathname?.startsWith(section.path) && (
                  <div className="pl-8 mt-1 space-y-1">
                    {section.subRoutes.map((subRoute) => (
                      <Link key={subRoute.name} href={subRoute.path}>
                        <span
                          className={`block text-sm py-1 ${
                            isActive(subRoute.path) ? "text-blue-400" : "hover:text-gray-300"
                          }`}
                        >
                          {subRoute.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
