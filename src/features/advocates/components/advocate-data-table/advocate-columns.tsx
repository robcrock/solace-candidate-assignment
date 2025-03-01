"use client"

import { ColumnDef } from "@tanstack/react-table"

import { formatPhoneNumber } from "@/lib/utils"
import { Advocate } from "@/app/api/advocates/route"
import { ColumnHeader } from "@/components/ui/data-table/column-header"

const advocateColumns: ColumnDef<Advocate>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => <ColumnHeader column={column} title="First Name" />,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => <ColumnHeader column={column} title="Last Name" />,
  },
  {
    accessorKey: "city",
    header: ({ column }) => <ColumnHeader column={column} title="City" />,
  },
  {
    accessorKey: "degree",
    header: ({ column }) => <ColumnHeader column={column} title="Degree" />,
  },
  {
    accessorKey: "specialties",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Specialties" />
    ),
    filterFn: "arrIncludes",
    size: 330,
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

export { advocateColumns }
