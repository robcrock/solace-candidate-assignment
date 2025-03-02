"use client"

import { useState, useEffect } from "react"
import {
  ColumnFiltersState,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table"

import { DataTable } from "@/components/ui/data-table/data-table"
import { FilterControls } from "./filter-controls"
import { useAdvocates } from "@/features/advocates/hooks/use-advocates"
import { advocateColumns } from "@/features/advocates/components/advocate-data-table/advocate-columns"
import { PaginationControls } from "@/features/advocates/components/advocate-data-table/pagintation-controls"
import { Spinner } from "@/components/spinner"

export type AdvocateFilters = {
  firstName: string
  lastName: string
  city: string
  degree: string
  yearsOfExperience: string
}

const AdvocateDataTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  const [activeFilters, setActiveFilters] = useState<AdvocateFilters>({
    firstName: "",
    lastName: "",
    city: "",
    degree: "",
    yearsOfExperience: "",
  })

  useEffect(() => {
    // Convert to columnFilters format
    const newColumnFilters = Object.entries(activeFilters)
      .filter(([_, value]) => value)
      .map(([id, value]) => ({
        id,
        value,
      }))

    setColumnFilters(newColumnFilters)
  }, [activeFilters])

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  // Reset to page 1 when sorting changes
  useEffect(() => {
    setCurrentPage(1)
  }, [sorting])

  const {
    data: advocateResponse,
    isLoading,
    error,
  } = useAdvocates(currentPage, pageSize, activeFilters, sorting)

  const pagination = {
    pageIndex: currentPage - 1,
    pageSize: pageSize,
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleFilterChange = (newFilters: AdvocateFilters) => {
    setActiveFilters(newFilters)
    setCurrentPage(1)
  }

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <div>Error loading advocates: {error.message}</div>
  }

  const advocates = advocateResponse?.data || []
  const serverPagination = advocateResponse?.pagination

  return (
    <DataTable
      data={advocates}
      columns={advocateColumns}
      tableOptions={{
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        manualPagination: true,
        manualFiltering: true,
        manualSorting: true,
        pageCount: serverPagination?.totalPages || 1,
        state: {
          pagination,
          sorting,
          columnFilters,
        },
      }}
      renderFilters={(table) => (
        <FilterControls
          table={table}
          onFilterChange={handleFilterChange}
          activeFilters={activeFilters}
        />
      )}
      renderPagination={(table) => (
        <PaginationControls
          table={table}
          serverPagination={serverPagination}
          onPageChange={handlePageChange}
        />
      )}
    />
  )
}

export { AdvocateDataTable }
