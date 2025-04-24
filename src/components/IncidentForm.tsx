
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Incident, Severity } from "@/types/incident";
import { useToast } from "@/components/ui/use-toast";

interface IncidentFormProps {
  onSubmit: (incident: Omit<Incident, "id" | "reported_at">) => void;
}

export function IncidentForm({ onSubmit }: IncidentFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("Medium");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      severity
    });

    setTitle("");
    setDescription("");
    setSeverity("Medium");

    toast({
      title: "Success",
      description: "Incident reported successfully"
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-4">Report New Incident</h2>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter incident title"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the incident"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Severity</label>
        <Select value={severity} onValueChange={(value) => setSeverity(value as Severity)}>
          <SelectTrigger>
            <SelectValue placeholder="Select severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        Submit Report
      </Button>
    </form>
  );
}
