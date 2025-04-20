import { Folder, Forward, MoreHorizontal, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { ErrorMessage, presentationAPI } from "../../lib/api";
import { toast } from "sonner";
import { useStore } from "../../context/StoreContext";

const NavProjects = () => {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const { setSlides } = useStore();

  const [loadingProjects, setLoadingProjects] = useState(true);
  const [allProjects, setAllProjects] = useState([]);

  const getProjects = async () => {
    try {
      const { data } = await presentationAPI.getAll();
      setAllProjects(data.data);
    } catch (error) {
      toast("Error", { description: ErrorMessage(error) });
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleDelete = async (projectId) => {
    if (!projectId) {
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

      toast.success("Success", {
        description: "Project deleted successfully",
      });
      setAllProjects(allProjects.filter((item) => item._id !== projectId));
      // navigate("/trash", { replace: true });
      navigate(0);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Oops!", {
        description:
          ErrorMessage(error) ||
          "Something went wrong. Please contact support.",
      });
    }
  };

  const handleNavigation = (slideData, projectId) => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    navigate(`/presentation/${projectId}`);
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      {loadingProjects ? (
        <div className="grid gap-2 px-2">
          <Skeleton className="w-full h-4 rounded-full" />
          <Skeleton className="w-full h-4 rounded-full" />
          <Skeleton className="w-full h-4 rounded-full" />
        </div>
      ) : (
        <SidebarMenu>
          {allProjects.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                onClick={() => handleNavigation(item.slides, item._id)}
              >
                <button className="truncate">{item.title}</button>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem
                    onClick={() => handleNavigation(item.slides, item._id)}
                  >
                    <Folder className="text-muted-foreground" />
                    <span>View Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="text-muted-foreground" />
                    <span>Share Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleDelete(item._id)}>
                    <Trash2 className="text-muted-foreground" />
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      )}
    </SidebarGroup>
  );
};

export default NavProjects;
