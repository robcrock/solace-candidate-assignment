"use client"

import { useState } from "react"
import {
  ColumnFiltersState,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
} from "@tanstack/react-table"

import { DataTable } from "@/components/ui/data-table/data-table"
import { FilterControls } from "./filter-controls"
import { useAdvocates } from "@/features/advocates/hooks/use-advocates"
import { advocateColumns } from "@/features/advocates/components/advocate-data-table/advocate-columns"
import { PaginationControls } from "@/features/advocates/components/advocate-data-table/pagintation-controls"
import { Spinner } from "@/components/spinner"

const AdvocateDataTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const {
    data: advocateResponse,
    isLoading,
    error,
  } = useAdvocates(currentPage, pageSize)

  const pagination = {
    pageIndex: currentPage - 1,
    pageSize: pageSize,
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
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
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        manualPagination: true,
        pageCount: serverPagination?.totalPages || 1,
        state: {
          pagination,
          sorting,
          columnFilters,
        },
      }}
      renderFilters={(table) => <FilterControls table={table} />}
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
