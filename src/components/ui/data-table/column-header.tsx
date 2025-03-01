import { Column } from "@tanstack/react-table"
import { LucideArrowDown, LucideArrowUp, LucideArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const getSortIcon = (sortOrder: "asc" | "desc") => {
  return sortOrder === "asc" ? (
    <LucideArrowUp className="ml-2 h-4 w-4" />
  ) : (
    <LucideArrowDown className="ml-2 h-4 w-4" />
  )
}

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function ColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const isSorted = column.getIsSorted()

  const sortHandler = () => {
    if (!isSorted) {
      // Start by setting the sort to 'asc'
      column.toggleSorting(false)
      return
    } else if (column.getIsSorted() === "desc") {
      // When we reach the sort order 'desc', we want to clear the sorting
      column.clearSorting()
    } else {
      // Otherwise, set the sort order to 'desc'
      column.toggleSorting(true)
    }
  }

  const sortOrder = column.getIsSorted() === "asc" ? "asc" : "desc"
  const sortIcon = getSortIcon(sortOrder)

  return (
    <Button
      className="flex justify-between w-full items-center px-2 group"
      variant="ghost"
      onClick={() => sortHandler()}
    >
      <span
        className={cn("text-muted-foreground group-hover:truncate", {
          truncate: isSorted,
        })}
      >
        {title}
      </span>
      {isSorted && sortIcon}
      {!isSorted && (
        <LucideArrowUpDown className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-50 " />
      )}
    </Button>
  )
}
