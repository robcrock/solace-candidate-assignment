"use client"

import { ColumnDef } from "@tanstack/react-table"

import { formatPhoneNumber } from "@/lib/utils"
import { Advocate } from "@/app/api/advocates/route"
import { ColumnHeader } from "@/components/ui/data-table/column-header"

const advocateColumns: ColumnDef<Advocate>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => <ColumnHeader column={column} title="First Name" />,
    enableSorting: true,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => <ColumnHeader column={column} title="Last Name" />,
    enableSorting: true,
  },
  {
    accessorKey: "city",
    header: ({ column }) => <ColumnHeader column={column} title="City" />,
    enableSorting: true,
  },
  {
    accessorKey: "degree",
    header: ({ column }) => <ColumnHeader column={column} title="Degree" />,
    enableSorting: true,
  },
  {
    accessorKey: "specialties",
    header: "Specialties",
    size: 330,
    enableSorting: false, // Disable sorting for array column (complex to sort)
  },
  {
    accessorKey: "yearsOfExperience",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Years of Experience" />
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("yearsOfExperience")}</div>
    ),
    filterFn: "includesString",
    enableSorting: true,
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      const phoneNumber: string = row.getValue("phoneNumber")
      const formatted = formatPhoneNumber(phoneNumber)

      return <div>{formatted}</div>
    },
    enableSorting: false, // Typically phone numbers aren't sorted
  },
]

export { advocateColumns }
