"use client";
import { useState } from "react";
import { Button } from "../ui/button";
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
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

interface DeleteProps {
  id: string;
  item: string;
}

const Delete: React.FC<DeleteProps> = ({ id, item }) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      const itemType = item === "member" ? "members" : "groups";
      setLoading(true);
      const res = await fetch(`/api/${itemType}/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLoading(false);
        window.location.href = `/${itemType}`;
        toast.success("Član je uspješno obrisana");
      }
    } catch (err) {
      console.log("[Delete]", err);
      toast.error("Something went wrong, please try again");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {" "}
        <Button>
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Da li ste sigurni?</AlertDialogTitle>
          <AlertDialogDescription>
            Ova radnja je nepovratna. Obrisani podaci se ne mogu vratiti.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Odustani</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Izbriši</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
