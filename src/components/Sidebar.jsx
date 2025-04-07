import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";

export default function Sidebar() {
  return (
    <Card className="w-64 shadow-sm border-gray-200">
      <CardContent className="p-4 space-y-6">
        <div className="pt-2">
          <CreateEventButton />
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <SmallCalendar />
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <Labels />
        </div>
      </CardContent>
    </Card>
  );
}