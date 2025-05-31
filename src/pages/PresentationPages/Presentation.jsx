import React, { useEffect, useState } from "react";
import { useStore } from "../../context/StoreContext";
import { useTheme } from "next-themes";
import { Loader, Loader2 } from "lucide-react";
import { DndProvider } from "react-dnd";
import { useParams } from "react-router-dom";
import LayoutPreview from "./Components/LeftSidebar/LayoutPreview";
import Editor from "./Components/Editor/Editor";
import { toast } from "sonner";
import { HTML5Backend } from "react-dnd-html5-backend";
import EditorSidebar from "./Components/RightSidebar/EditorSidebar";
import { Navbar } from "./Components/Navbar/Navbar";
import { themes } from "../../utils/constants";
import { presentationAPI } from "../../lib/api";

export default function Presentation({ isEditable = true }) {
  const { id: presentationId } = useParams();

  const { currentTheme, setCurrentTheme, setSlides, setProject } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const GetPresentaion = async () => {
      try {
        const { data } = await presentationAPI.getById(presentationId);
        setSlides(data.data.slides);
        setProject(data.data);
        setCurrentTheme(
          themes.find((theme) => theme.name === data.data.themeName)
        );
      } catch (error) {
        toast.error("Error", {
          description: "An unexpected error occurred",
        });
      } finally {
        setIsLoading(false);
      }
    };
    GetPresentaion();
  }, [presentationId]);

  useEffect(() => {
    if (!isEditable) return;
    const updateThemes = async () => {
      try {
        await presentationAPI.updateTheme(presentationId, currentTheme.name);
      } catch (error) {
        toast.error("Error", {
          description: "An unexpected error occurred",
        });
      } finally {
        setIsLoading(false);
      }
    };
    updateThemes();
  }, [currentTheme.name]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-primary" /> Get All
        Slides...
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col">
        <Navbar presentationId={presentationId} isEditable={isEditable} />
        <div
          className="flex-1 flex overflow-hidden pt-16"
          style={{
            color: currentTheme.accentColor,
            fontFamily: currentTheme.fontFamily,
            backgroundColor: currentTheme.backgroundColor,
          }}
        >
          <LayoutPreview />
          <div className="flex-1 ml-64 pr-16">
            <Editor isEditable={isEditable} />
          </div>
          <EditorSidebar />
        </div>
      </div>
    </DndProvider>
  );
}
