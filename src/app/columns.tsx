"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Advocate } from "./api/advocates/route";
import { formatPhoneNumber } from "@/lib/utils";

export const columns: ColumnDef<Advocate>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "degree",
    header: "Degree",
  },
  {
    accessorKey: "specialties",
    header: "Specialties",
    size: 340,
  },
  {
    accessorKey: "yearsOfExperience",
    header: () => <div className="text-right">Years of Experience</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("yearsOfExperience")}</div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      const phoneNumber: string = row.getValue("phoneNumber");
      const formatted = formatPhoneNumber(phoneNumber);

      return <div>{formatted}</div>;
    },
  },
];
