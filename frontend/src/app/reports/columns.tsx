"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Report } from "@/types";

export const columns: ColumnDef<Report>[] = [
  {
    id: "select",
    cell: ({ row }) => <p>{row.index + 1}.</p>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "result",
    header: "Result",
  },
  {
    accessorKey: "totalQuestions",
    header: "Total Questions",
  },
  {
    accessorKey: "correctAnswers",
    header: "Correct Answers",
  },
  {
    accessorKey: "wrongAnswers",
    header: "Wrong Answers",
  },
];
