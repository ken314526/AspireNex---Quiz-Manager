"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Quiz } from "@/types";

export const columns: ColumnDef<Quiz>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
];
