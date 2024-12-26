import { useDispatch } from "react-redux";
import { closeDrawer, openDrawer } from "@/store/slices/drawerSlice";
import useLocalStorageState from "use-local-storage-state";
import Link from "next/link";
import ToggleSidebarButton from "./ui/ToggleSidebarButton";
import { usePathname } from "next/navigation";

const sections = [
  { name: "Home", path: "/" },
  {
    name: "Monitoring & Analytics",
    path: "/monitoring",
    subRoutes: [
      { name: "Streaming", path: "/monitoring/streaming" },
      { name: "Analytics", path: "/monitoring/analytics" },
    ],
  },
  { name: "Data Streaming", path: "/data-streaming" },
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

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path; // Home only matches exact path
    }
    return pathname?.startsWith(path);
  };

  return (
    <div>
      <div
        className={`h-screen bg-sidebar text-sidebar-foreground shadow-lg transition-transform duration-300 ${
          isOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        {isOpen && (
          <nav className="mt-[5.5rem] space-y-4 px-4">
            {sections.map((section) => (
              <div key={section.name}>
                <Link href={section.path}>
                  <span
                    className={`flex items-center space-x-2 py-2 px-3 text-sm rounded-lg transition ${
                      isActive(section.path)
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-muted dark:hover:bg-muted-dark"
                    }`}
                  >
                    {section.name}
                  </span>
                </Link>
                {section.subRoutes && isActive(section.path) && (
                  <div className="pl-6 mt-2 space-y-2 border-l-2 border-border">
                    {section.subRoutes.map((subRoute) => (
                      <Link key={subRoute.name} href={subRoute.path}>
                        <span
                          className={`block text-sm py-1 px-2 rounded transition ${
                            isActive(subRoute.path)
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
        )}
      </div>

      <div className={`fixed top-12 ${isOpen ? "left-2" : "left-2"}`}>
        <ToggleSidebarButton isOpen={isOpen} toggleDrawer={toggleDrawer} />
      </div>
    </div>
  );
}
