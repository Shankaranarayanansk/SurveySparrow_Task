import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import GlobalContext from "../context/GlobalContext";

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  
  return (
    <Button
      onClick={() => setShowEventModal(true)}
      variant="outline"
      className="flex items-center gap-2 px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm hover:shadow-md"
    >
      <Plus className="w-5 h-5" />
      <span>Create Event</span>
    </Button>
  );
}