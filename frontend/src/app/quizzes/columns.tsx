"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Quiz } from "@/types";

export const columns: ColumnDef<Quiz>[] = [
  {
    id: "select",
    cell: ({ row }) => <p>{row.index + 1}.</p>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
];
