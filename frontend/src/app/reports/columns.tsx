"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Report } from "@/types";

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "title",
    header: "Title",
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
