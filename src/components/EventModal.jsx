import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Calendar, AlignLeft, Bookmark, GripHorizontal, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

// Color mapping for Shadcn UI
const colorMapping = {
  indigo: "bg-indigo-500 hover:bg-indigo-600",
  gray: "bg-gray-500 hover:bg-gray-600",
  green: "bg-green-500 hover:bg-green-600",
  blue: "bg-blue-500 hover:bg-blue-600",
  red: "bg-red-500 hover:bg-red-600",
  purple: "bg-purple-500 hover:bg-purple-600",
};

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }

  function handleDelete() {
    dispatchCalEvent({
      type: "delete",
      payload: selectedEvent,
    });
    setShowEventModal(false);
  }

  return (
    <Dialog open={true} onOpenChange={() => setShowEventModal(false)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between border-b pb-2">
          <div className="flex items-center">
            <GripHorizontal className="h-5 w-5 text-gray-400 mr-2" />
            <DialogTitle>{selectedEvent ? "Edit Event" : "Add Event"}</DialogTitle>
          </div>
          <div className="flex items-center space-x-2">
            {selectedEvent && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowEventModal(false)}
              className="text-gray-400"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                name="title"
                placeholder="Add title"
                value={title}
                required
                className="text-lg font-medium focus-visible:ring-primary"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-700">{daySelected.format("dddd, MMMM DD")}</span>
            </div>
            
            <div className="flex items-start space-x-2">
              <AlignLeft className="h-5 w-5 text-gray-500 mt-2" />
              <Textarea
                name="description"
                placeholder="Add a description"
                value={description}
                className="min-h-24 focus-visible:ring-primary"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Bookmark className="h-5 w-5 text-gray-500" />
              <div className="flex gap-2">
                {labelsClasses.map((lblClass, i) => (
                  <Button
                    type="button"
                    key={i}
                    onClick={() => setSelectedLabel(lblClass)}
                    className={cn(
                      "w-8 h-8 rounded-full p-0 flex items-center justify-center",
                      colorMapping[lblClass]
                    )}
                  >
                    {selectedLabel === lblClass && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter className="border-t pt-4 mt-4">
            <Button 
              type="submit" 
              className={cn(
                "px-6",
                colorMapping[selectedLabel]
              )}
            >
              {selectedEvent ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}