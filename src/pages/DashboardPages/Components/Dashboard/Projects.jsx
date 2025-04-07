import React, { useState } from "react";
import { cn } from "../../../../lib/utils";
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
import { Image } from "lucide-react";

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
          projectId={project?.id}
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
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);

  const { slide } = useStore();

  const handleNavigation = () => {
    // setSlides(JSON.parse(JSON.stringify(slideData)));
    // router.push(`/presentation/${projectId}`);
  };

  // Theme
  const Theme = {
    name: "",
    fontFamily: "",
    fontColor: "",
    backgroundColor: "",
    slideBackgroundColor: "",
    accentColor: "",
    gradientBackground: "",
    sidebarColor: "",
    navbarColor: "",
    type: "light" || "dark",
  };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - new Date(timestamp).getTime()) / 1000
    );

    const intervals = [
      { label: "year", value: 60 * 60 * 24 * 365 },
      { label: "month", value: 60 * 60 * 24 * 30 },
      { label: "days", value: 60 * 60 * 24 },
      { label: "hours", value: 60 * 60 },
      { label: "mins", value: 60 },
      { label: "sec", value: 1 },
    ];

    for (let i = 0; i < intervals.length; i++) {
      const interval = intervals[i];
      const count = Math.floor(diffInSeconds / interval.value);
      if (count >= 1) {
        return `${count} ${interval.label} ago `;
      }
    }
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
      // const res = await recoverProject(projectId);
      // const res = await Promise(() => setTimeout(() => {}, 3000));

      // if (res.status !== 200) {
      //   toast.error("Oops!", {
      //     description: res.error || "Something went wrong",
      //   });
      //   return;
      // }

      setOpen(false);
      // router.refresh();
      toast.success("Success", {
        description: "Project recovered successfully",
      });
    } catch (error) {
      console.error("Recovery error:", error);
      toast.error("Oops!", {
        description: "Something went wrong. Please contact support.",
      });
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
      // const res = await deleteProject(projectId);
      // const res = await Promise(() => setTimeout(() => {}, 3000));

      // if (res.status !== 200) {
      //   toast.error("Oops!", {
      //     description: res.error || "Failed to delete the project",
      //   });
      //   return;
      // }

      setOpen(false);
      // router.refresh();
      toast.success("Success", {
        description: "Project deleted successfully",
      });
    } catch (error) {
      console.error("Recovery error:", error);
      toast.error("Oops!", {
        description: "Something went wrong. Please contact support.",
      });
    }
  };

  return (
    <motion.div
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDelete && "hover:bg-muted/50"
      }`}
      variants={itemVariants}
    >
      <div
        className="relative aspect-[16/10] rounded-lg cursor-pointer"
        onClick={handleNavigation}
      >
        <div
          className={cn(
            "w-full relative aspect-[16/9] rounded-lg overflow-hidden transition-all duration-200 p-2"
          )}
          style={{
            fontFamily: Theme.fontFamily,
            color: Theme.accentColor,
            backgroundColor: Theme.slideBackgroundColor,
            backgroundImage: Theme.gradientBackground,
          }}
        >
          {slide ? (
            <div className="scale-[0.5] origin-top-left w-[200%] h-[200%] overflow-hidden">
              <MasterRecursiveComponent
                slideId={JSON.parse(JSON.stringify(slideData))?.[0].id}
                content={JSON.parse(JSON.stringify(slideData))?.[0].content}
                onContentChange={() => {}}
                isPreview={true}
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-400 flex justify-center items-center rounded-lg">
              <Image className="w-6 h-6 text-gray-500" />
            </div>
          )}
        </div>

        <div className="w-full">
          <div className="space-y-1">
            <h3 className="font-semibold text-base text-primary line-clamp-1">
              {title} Title
            </h3>
            <div className="flex w-full justify-between items-center gap-2">
              <p
                className="text-sm text-muted-foreground"
                suppressHydrationWarning
              >
                {/* {timeAgo(createdAt)} */}
                Just Now
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
