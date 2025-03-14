"use client";

import { useDispatch, useSelector } from "react-redux";
import { closeDrawer, openDrawer } from "@/store/slices/drawerSlice";
import { RootState } from "@/store";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ToggleSidebarButton from "./ui/ToggleSidebarButton";

interface SubRoute {
  name: string;
  path: string;
}

interface Section {
  name: string;
  path: string;
  subRoutes?: SubRoute[];
}

const sections: Section[] = [
  { name: "Overview", path: "/" },
  {
    name: "Dashboard",
    path: "/dashboard/monitoring",
    subRoutes: [
      { name: "Monitoring", path: "/dashboard/monitoring" },
      { name: "Analytics", path: "/dashboard/analytics" },
      { name: "Cybersecurity", path: "/dashboard/cybersecurity" },
      { name: "Streaming Data", path: "/dashboard/streaming" },
    ],
  },
  {
    name: "System Management",
    path: "/system",
    subRoutes: [{ name: "Health", path: "/system/health" }],
  },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.drawer.isDrawerOpen);
  const pathname = usePathname();

  const toggleDrawer = () => {
    dispatch(isOpen ? closeDrawer() : openDrawer());
  };

  const isParentActive = (section: Section) => {
    if (!pathname) return false;
    return section.subRoutes?.some((subRoute) => pathname.startsWith(subRoute.path)) ?? pathname === section.path;
  };

  return (
    <>
      {/* Sidebar Toggle Button (Fixed Position) */}
      <div className="absolute top-14 left-4 z-50">
        <ToggleSidebarButton isOpen={isOpen} toggleDrawer={toggleDrawer} />
      </div>

      {/* Sidebar */}
      <aside
        className={`h-screen bg-sidebar text-sidebar-foreground shadow-lg transition-all duration-300 flex flex-col ${
          isOpen ? "min-w-[175px] w-[175px]" : "w-0 hidden"
        }`}
      >
        <div className="flex-1 p-4">
          <nav className="mt-20 space-y-4">
            {sections.map((section) => (
              <div key={section.name}>
                <Link href={section.path}>
                  <span
                    className={`flex items-center space-x-2 py-2 px-3 text-sm rounded-lg transition ${
                      isParentActive(section)
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-muted dark:hover:bg-muted-dark"
                    }`}
                  >
                    {section.name}
                  </span>
                </Link>

                {section.subRoutes && (
                  <div className="pl-6 mt-2 space-y-2 border-l-2 border-border">
                    {section.subRoutes.map((subRoute) => (
                      <Link key={subRoute.name} href={subRoute.path}>
                        <span
                          className={`block text-sm py-1 px-2 rounded transition ${
                            pathname === subRoute.path
                              ? "bg-secondary text-secondary-foreground shadow-sm"
                              : "hover:text-sidebar-foreground"
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
        </div>
      </aside>
    </>
  );
}
