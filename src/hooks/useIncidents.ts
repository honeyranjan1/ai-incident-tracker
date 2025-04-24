
import { useState, useMemo } from 'react';
import { Incident, Severity } from '../types/incident';

const mockIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics...",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z"
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information...",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z"
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata...",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z"
  }
];

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | "All">("All");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const filteredAndSortedIncidents = useMemo(() => {
    let filtered = incidents;
    
    if (selectedSeverity !== "All") {
      filtered = incidents.filter(incident => incident.severity === selectedSeverity);
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();
      return sortDirection === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [incidents, selectedSeverity, sortDirection]);

  const addIncident = (incident: Omit<Incident, "id" | "reported_at">) => {
    const newIncident: Incident = {
      ...incident,
      id: Math.max(...incidents.map(i => i.id), 0) + 1,
      reported_at: new Date().toISOString()
    };
    setIncidents(prev => [...prev, newIncident]);
  };

  const toggleExpanded = (id: number) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return {
    incidents: filteredAndSortedIncidents,
    selectedSeverity,
    setSelectedSeverity,
    sortDirection,
    setSortDirection,
    addIncident,
    expandedIds,
    toggleExpanded
  };
}
