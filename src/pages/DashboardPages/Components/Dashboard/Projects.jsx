"use client";

import { useState } from "react";
import { cn, timeAgo } from "../../../../lib/utils";
import { motion } from "framer-motion";
import AlertDialog from "./AlertDialog";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import {
  containerVariants,
  itemVariants,
} from "../../../../utils/motionVariants";
import { MasterRecursiveComponent } from "../../../PresentationPages/Components/Editor/MasterRecursiveComponent";
import { useStore } from "../../../../context/StoreContext";
import { ImageIcon } from "lucide-react";
import { presentationAPI, ErrorMessage } from "../../../../lib/api";
import { useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { themes } from "../../../../utils/constants";

export default function Projects({ projects }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project, id) => (
        <ProjectCard
          key={id}
          projectId={project?._id}
          title={project?.title}
          createdAt={project?.createdAt?.toString()}
          isDelete={project?.isDeleted}
          slideData={project?.slides}
          themeName={project?.themeName}
        />
      ))}
    </motion.div>
  );
}

const ProjectCard = ({
  createdAt,
  projectId,
  slideData,
  themeName,
  title,
  isDelete = false,
}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { setSlides } = useStore();

  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    navigate(`/presentation/${projectId}`);
  };

  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Error", {
        description: "Project not found.",
      });
      return;
    }

    try {
      const res = await presentationAPI.recover(projectId);

      if (res.status !== 200) {
        toast.error("Oops!", {
          description: res.error || "Something went wrong",
        });
        return;
      }

      setOpen(false);
      toast.success("Success", {
        description: "Project recovered successfully",
      });
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Recovery error:", error);
      toast.error("Oops!", {
        description:
          ErrorMessage(error) ||
          "Something went wrong. Please contact support.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Error", {
        description: "Project not found.",
      });
      return;
    }

    try {
      const res = await presentationAPI.delete(projectId);

      if (res.status !== 200) {
        toast.error("Oops!", {
          description: res.error || "Failed to delete the project",
        });
        return;
      }

      setOpen(false);
      toast.success("Success", {
        description: "Project deleted successfully",
      });
      navigate("/trash", { replace: true });
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Oops!", {
        description:
          ErrorMessage(error) ||
          "Something went wrong. Please contact support.",
      });
    } finally {
      setLoading(false);
    }
  };

  const currentTheme = themes.filter((theme) => theme.name === themeName)[0];

  return (
    <motion.div
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDelete && "hover:bg-muted/50"
      }`}
      variants={itemVariants}
    >
      <div className="relative aspect-[16/10] rounded-lg cursor-pointer">
        <div
          className={cn(
            "w-full relative aspect-[16/9] rounded-lg overflow-hidden transition-all duration-200 p-2"
          )}
          style={{
            fontFamily: currentTheme?.fontFamily,
            color: currentTheme?.accentColor,
            background:
              currentTheme?.slideBackgroundColor ||
              currentTheme?.gradientBackground,
          }}
          onClick={handleNavigation}
        >
          {slideData.length !== 0 ? (
            <div className="scale-[0.5] origin-top-left w-[200%] h-[200%] overflow-hidden">
              <DndProvider backend={HTML5Backend}>
                <MasterRecursiveComponent
                  slideId={JSON.parse(JSON.stringify(slideData))?.[0]?._id}
                  content={JSON.parse(JSON.stringify(slideData))?.[0]?.content}
                  onContentChange={() => {}}
                  isPreview={true}
                />
              </DndProvider>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-400 flex justify-center items-center rounded-lg">
              <ImageIcon className="w-6 h-6 text-gray-500" />
            </div>
          )}
        </div>

        <div className="w-full">
          <div className="space-y-1">
            <h3 className="font-semibold text-base text-primary line-clamp-1">
              {title}
            </h3>
            <div className="flex w-full justify-between items-center gap-2">
              <p
                className="text-sm text-muted-foreground"
                suppressHydrationWarning
              >
                {timeAgo(createdAt)}
              </p>
              {isDelete ? (
                <AlertDialog
                  description={
                    "This will recover your project and restore your data."
                  }
                  className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                  loading={loading}
                  open={open}
                  onClick={handleRecover}
                  handleOpen={() => setOpen(!open)}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className="bg-background-80 dark:hover:bg-background-90 border"
                    disabled={loading}
                  >
                    Recover
                  </Button>
                </AlertDialog>
              ) : (
                <AlertDialog
                  description="This will delete your project and send to trash."
                  className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                  onClick={handleDelete}
                  loading={loading}
                  open={open}
                  handleOpen={() => setOpen(!open)}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className="bg-background-80 dark:hover:bg-background-90 border"
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </AlertDialog>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
