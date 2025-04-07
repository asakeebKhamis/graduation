import {
  AlertDialog as AlertDialogRoot,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";
import { Button } from "../../../../components/ui/button";
import { Loader2 } from "lucide-react";

export default function AlertDialog({
  children,
  className,
  description,
  loading = false,
  onClick,
  handleOpen,
  open,
}) {
  return (
    <AlertDialogRoot open={open} onOpenChange={handleOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" className={className} onClick={onClick}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Loading...
              </>
            ) : (
              <>Continue</>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
}
