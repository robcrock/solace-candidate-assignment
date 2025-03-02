"use client"

import { useState, useEffect } from "react"
import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AdvocateFilters } from "./advocate-data-table"

interface FilterControlsProps<TData> {
  table: Table<TData>
  onFilterChange: (filters: AdvocateFilters) => void
  activeFilters: AdvocateFilters
}

const FilterControls = <TData,>({
  table,
  onFilterChange,
  activeFilters,
}: FilterControlsProps<TData>) => {
  // Initialize state from active filters
  const [filters, setFilters] = useState({
    firstName: activeFilters.firstName || "",
    lastName: activeFilters.lastName || "",
    city: activeFilters.city || "",
    degree: activeFilters.degree || "",
    yearsOfExperience: activeFilters.yearsOfExperience || "",
  })

  // Update local state when activeFilters change
  useEffect(() => {
    setFilters({
      firstName: activeFilters.firstName || "",
      lastName: activeFilters.lastName || "",
      city: activeFilters.city || "",
      degree: activeFilters.degree || "",
      yearsOfExperience: activeFilters.yearsOfExperience || "",
    })
  }, [activeFilters])

  // Sync with TanStack table table model
  useEffect(() => {
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value && table.getColumn(key)) {
        table.getColumn(key)?.setFilterValue(value)
      }
    })
  }, [activeFilters, table])

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value }
    setFilters(newFilters)
  }

  const handleResetFilters = () => {
    const emptyFilters = {
      firstName: "",
      lastName: "",
      city: "",
      degree: "",
      yearsOfExperience: "",
    }
    setFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  const handleApplyFilters = () => {
    onFilterChange(filters)
  }

  const hasActiveFilters = Object.values(activeFilters).some(Boolean)
  const hasLocalFilterChanges =
    JSON.stringify(filters) !== JSON.stringify(activeFilters)

  return (
    <div className="flex flex-col">
      <p className="text-muted-foreground mb-1">Filters</p>
      <div className="flex items-center gap-2 flex-wrap">
        <Input
          placeholder="First Name"
          value={filters.firstName}
          onChange={(event) =>
            handleFilterChange("firstName", event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Last Name"
          value={filters.lastName}
          onChange={(event) =>
            handleFilterChange("lastName", event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="City"
          value={filters.city}
          onChange={(event) => handleFilterChange("city", event.target.value)}
          className="max-w-sm"
        />
        <Input
          placeholder="Degree"
          value={filters.degree}
          onChange={(event) => handleFilterChange("degree", event.target.value)}
          className="max-w-sm"
        />
        <Input
          placeholder="Years of Experience"
          value={filters.yearsOfExperience}
          onChange={(event) =>
            handleFilterChange("yearsOfExperience", event.target.value)
          }
          className="max-w-sm"
        />

        {/* Show Apply button when there are unsaved changes */}
        {hasLocalFilterChanges && (
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
        )}

        {/* Show Reset button when there are active filters */}
        {hasActiveFilters && (
          <Button onClick={handleResetFilters} variant="outline">
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  )
}

export { FilterControls }
