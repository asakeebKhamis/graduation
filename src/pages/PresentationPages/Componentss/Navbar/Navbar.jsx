import React, { useState } from "react";
import { useStore } from "../../../../context/StoreContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Home, Play, Share } from "lucide-react";
import PresentationMode from "./PresentationMode";

export const Navbar = ({ presentationId }) => {
  const { currentTheme } = useStore();
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/share/${presentationId}`
    );
    toast.success("Link Copied", {
      description: "The link has been copied to your clipboard",
    });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 w-full h-20 flex justify-between items-center py-4 px-7 border-b"
      style={{
        backgroundColor:
          currentTheme.navbarColor || currentTheme.backgroundColor,
        color: currentTheme.accentColor,
      }}
    >
      <Link to="/dashboard" passHref>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          style={{ backgroundColor: currentTheme.backgroundColor }}
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Return Home</span>
        </Button>
      </Link>

      <Link
        href="/presentation/template-market"
        className="text-lg font-semibold hidden sm:block"
      >
        Presentation Editor
      </Link>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          style={{ backgroundColor: currentTheme.backgroundColor }}
          onClick={handleCopy}
        >
          <Share className="w-4 h-4" />
        </Button>

        <Button
          variant="default"
          className="flex items-center gap-2"
          onClick={() => setIsPresentationMode(true)}
        >
          <Play className="w-4 h-4" />
          <span className="hidden sm:inline">Present</span>
        </Button>
      </div>

      {isPresentationMode && (
        <PresentationMode onClose={() => setIsPresentationMode(false)} />
      )}
    </nav>
  );
};
