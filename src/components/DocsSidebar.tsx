import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "authentication", title: "Authentication" },
  { id: "get-complaint", title: "GET /api/complaints/:id" },
  { id: "patch-complaint", title: "PATCH /api/complaints/:id" },
  { id: "error-codes", title: "Error Codes" },
];

export const DocsSidebar = ({ activeSection, onSectionClick }: SidebarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        variant="outline"
        size="sm"
        className="fixed top-4 left-4 z-20 md:hidden"
      >
        {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <aside className={`docs-sidebar ${isMobileOpen ? "mobile-open" : ""} z-10`}>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Contents</h2>
          <nav>
            {sections.map((section) => (
              <div
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`docs-nav-item ${
                  activeSection === section.id ? "active" : ""
                }`}
              >
                {section.title}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-5 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};