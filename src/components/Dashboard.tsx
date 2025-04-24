
import { useIncidents } from "@/hooks/useIncidents";
import { FilterToolbar } from "./FilterToolbar";
import { IncidentForm } from "./IncidentForm";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";

export function Dashboard() {
  const {
    incidents,
    selectedSeverity,
    setSelectedSeverity,
    sortDirection,
    setSortDirection,
    addIncident,
    expandedIds,
    toggleExpanded
  } = useIncidents();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-orange-100 text-orange-800";
      case "Low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Safety Incident Dashboard</h1>
      
      <FilterToolbar
        selectedSeverity={selectedSeverity}
        onSeverityChange={setSelectedSeverity}
        sortDirection={sortDirection}
        onSortDirectionChange={setSortDirection}
      />

      <div className="grid md:grid-cols-[2fr,1fr] gap-6">
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="bg-white rounded-lg shadow-sm border p-4 transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium text-lg">{incident.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>
                      {format(new Date(incident.reported_at), "MMM d, yyyy 'at' h:mm a")}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                        incident.severity
                      )}`}
                    >
                      {incident.severity}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(incident.id)}
                  className="shrink-0"
                >
                  {expandedIds.has(incident.id) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {expandedIds.has(incident.id) && (
                <div className="mt-4 pt-4 border-t text-gray-600">
                  {incident.description}
                </div>
              )}
            </div>
          ))}
          
          {incidents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No incidents found matching the current filters.
            </div>
          )}
        </div>

        <div className="md:sticky md:top-4">
          <IncidentForm onSubmit={addIncident} />
        </div>
      </div>
    </div>
  );
}
