"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Advocate } from "./api/advocates/route"
import { formatPhoneNumber } from "@/lib/utils"
import { DataTableColumnHeader } from "./data-table-column-header"

export const columns: ColumnDef<Advocate>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
  },
  {
    accessorKey: "degree",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Degree" />
    ),
  },
  {
    accessorKey: "specialties",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Specialties" />
    ),
    filterFn: "arrIncludes",
    size: 330,
  },
  {
    accessorKey: "yearsOfExperience",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Years of Experience" />
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("yearsOfExperience")}</div>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      const phoneNumber: string = row.getValue("phoneNumber")
      const formatted = formatPhoneNumber(phoneNumber)

      return <div>{formatted}</div>
    },
  },
]
