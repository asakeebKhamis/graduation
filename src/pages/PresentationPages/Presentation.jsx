import React, { useEffect, useState } from "react";
import { useStore } from "../../context/StoreContext";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";
import { DndProvider } from "react-dnd";
import { useParams } from "react-router-dom";
import LayoutPreview from "./Components/LeftSidebar/LayoutPreview";
import Editor from "./Components/Editor/Editor";
import { toast } from "sonner";
import { HTML5Backend } from "react-dnd-html5-backend";
import EditorSidebar from "./Components/RightSidebar/EditorSidebar";
import { Navbar } from "./Components/Navbar/Navbar";

export default function Presentation() {
  const { id: presentationId } = useParams();

  const { setSlides, project, setProject, currentTheme, setCurrentTheme } =
    useStore();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   async (params) => {
  //     try {
  //       // const res = await getProjectById(params.presentationId);
  //       const res = await new Promise((resolve) => setTimeout(() => {}, 3000));

  //       if (res.status !== 200 || !res.data) {
  //         toast.error("Error", {
  //           description: "Unable to fetch project",
  //         });
  //         // redirect("/dashboard");
  //         return;
  //       }

  //       const findTheme = themes.find(
  //         (theme) => theme.name === res.data.themeName
  //       );
  //       setCurrentTheme(findTheme || themes[0]);
  //       setTheme(findTheme?.type === "dark" ? "dark" : "light");
  //       // setProject(res.data);
  //       setSlides(JSON.parse(JSON.stringify(res.data.slides)));
  //     } catch (error) {
  //       toast.error("Error", {
  //         description: "An unexpected error occurred",
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  // }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col">
        <Navbar presentationId={presentationId} />
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
            <Editor isEditable={true} />
          </div>
          <EditorSidebar />
        </div>
      </div>
    </DndProvider>
  );
}
