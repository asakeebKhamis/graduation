import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "src/components/ui/alert-dialog";

const DeleteAllButton = ({ Projects }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  //   const router = useRouter();

  const handleDeleteAllProjects = async () => {
    setLoading(true);

    if (!Projects || Projects.length == 0) {
      setLoading(false);
      toast.error("Error", { description: "No projects found" });
      setOpen(false);
      return;
    }

    try {
      //   const res = await deleteAllProjects(
      //     Projects.map((project) => project.id)
      //   );
      //   if (res.status !== 200) {
      //     throw new Error("Failed to delete all projects");
      //   }
      //   router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Failed to delete all projects",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-background/80 hover:bg-background/90 font-semibold"
          size="lg"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete All
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all your
            projects and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAllProjects}
            className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete All"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAllButton;
