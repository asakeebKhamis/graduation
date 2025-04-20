import React, { useState, useEffect } from "react";
import { useStore } from "../../../../context/StoreContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import {
  CloudCog,
  CloudLightningIcon,
  Home,
  Loader,
  Loader2,
  Play,
  Share,
} from "lucide-react";
import PresentationMode from "./PresentationMode";
import { Input } from "../../../../components/ui/input";
import { presentationAPI } from "src/lib/api";

export const Navbar = ({ presentationId }) => {
  const { currentTheme, isSaving, project } = useStore();
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [title, setTitle] = useState(project?.title || "Presentation Editor");

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/share/${presentationId}`
    );
    toast.success("Link Copied", {
      description: "The link has been copied to your clipboard",
    });
  };

  useEffect(() => {
    const updatePresentaion = async () => {
      try {
        await presentationAPI.update(presentationId, { title });
      } catch (error) {
        toast.error("Error", {
          description: "An unexpected error occurred",
        });
      }
    };
    const timeOut = setTimeout(() => {
      updatePresentaion();
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [title]);

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

      <Input
        className="font-semibold hidden sm:block w-fit text-center outline-none border-none text-xl"
        value={title}
        placeholder="Presentation Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <div
        className="flex items-center gap-4"
        style={{ color: currentTheme.accentColor }}
      >
        <div className="flex items-center gap-1">
          {isSaving ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" /> Saving...
            </>
          ) : (
            <>
              <CloudLightningIcon className="w-5 h-5" /> Saved
            </>
          )}
        </div>

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
