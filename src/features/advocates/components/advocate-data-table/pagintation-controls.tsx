"use client"

import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

interface PaginationControlsProps<TData> {
  table: Table<TData>
  serverPagination?: {
    page: number
    pageSize: number
    totalPages: number
    totalCount: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
  onPageChange?: (page: number) => void
}

const PaginationControls = <TData,>({
  table,
  serverPagination,
  onPageChange,
}: PaginationControlsProps<TData>) => {
  const currentPage =
    serverPagination?.page || table.getState().pagination.pageIndex + 1
  const pageSize =
    serverPagination?.pageSize || table.getState().pagination.pageSize
  const totalItems =
    serverPagination?.totalCount || table.getFilteredRowModel().rows.length

  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  const handlePreviousPage = () => {
    if (serverPagination && onPageChange) {
      onPageChange(currentPage - 1)
    } else {
      table.previousPage()
    }
  }

  const handleNextPage = () => {
    if (serverPagination && onPageChange) {
      onPageChange(currentPage + 1)
    } else {
      table.nextPage()
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{startItem}</span> to{" "}
        <span className="font-medium">{endItem}</span> of{" "}
        <span className="font-medium">{totalItems}</span> advocates
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={
            !serverPagination?.hasPreviousPage && !table.getCanPreviousPage()
          }
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={!serverPagination?.hasNextPage && !table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export { PaginationControls }
