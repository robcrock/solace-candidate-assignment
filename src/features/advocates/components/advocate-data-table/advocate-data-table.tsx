"use client"

import { useState } from "react"
import {
  ColumnFiltersState,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  SortingState,
} from "@tanstack/react-table"

import { DataTable } from "@/components/ui/data-table/data-table"
import { FilterControls } from "./filter-controls"
import { useAdvocates } from "@/features/advocates/hooks/useAdvocates"
import { advocateColumns } from "@/features/advocates/components/advocate-data-table/advocate-columns"
import { PaginationControls } from "@/features/advocates/components/advocate-data-table/pagintation-controls"

const AdvocateDataTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const advocates = useAdvocates()

  return (
    <DataTable
      data={advocates}
      columns={advocateColumns}
      tableOptions={{
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        state: {
          pagination,
          sorting,
          columnFilters,
        },
      }}
      renderFilters={(table) => <FilterControls table={table} />}
      renderPagination={(table) => <PaginationControls table={table} />}
    />
  )
}

export { AdvocateDataTable }
