"use client"

import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

interface PaginationControlsProps<TData> {
  table: Table<TData>
}

const PaginationControls = <TData,>({
  table,
}: PaginationControlsProps<TData>) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium">
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}
        </span>{" "}
        to{" "}
        <span className="font-medium">
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}
        </span>{" "}
        of{" "}
        <span className="font-medium">
          {table.getFilteredRowModel().rows.length}
        </span>{" "}
        advocates
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export { PaginationControls }
