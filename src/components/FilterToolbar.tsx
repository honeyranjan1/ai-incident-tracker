
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Severity } from "@/types/incident";
import { ArrowDown, ArrowUp } from "lucide-react";

interface FilterToolbarProps {
  selectedSeverity: Severity | "All";
  onSeverityChange: (severity: Severity | "All") => void;
  sortDirection: "asc" | "desc";
  onSortDirectionChange: (direction: "asc" | "desc") => void;
}

export function FilterToolbar({ 
  selectedSeverity, 
  onSeverityChange, 
  sortDirection, 
  onSortDirectionChange 
}: FilterToolbarProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center justify-between p-4 rounded-lg bg-gray-50">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Severity:</label>
        <Select value={selectedSeverity} onValueChange={(value) => onSeverityChange(value as Severity | "All")}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button
        variant="outline"
        onClick={() => onSortDirectionChange(sortDirection === "asc" ? "desc" : "asc")}
        className="flex items-center gap-2"
      >
        {sortDirection === "asc" ? (
          <>
            <ArrowUp className="h-4 w-4" />
            Oldest First
          </>
        ) : (
          <>
            <ArrowDown className="h-4 w-4" />
            Newest First
          </>
        )}
      </Button>
    </div>
  );
}
