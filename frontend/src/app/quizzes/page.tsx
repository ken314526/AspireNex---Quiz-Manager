"use client";
import Loading from "@/components/Loading";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setToken, setUser } from "@/lib/slices/userSlice";
import { Quiz } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataTable } from "../../components/ui/data-table";
import { columns } from "./columns";

export default function Page() {
  const user = useAppSelector((state) => state.user);
  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getUserInfo(token: string) {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.data?.success) {
          toast.success(response?.data?.message);
          dispatch(setUser(response?.data?.data));
          dispatch(setToken(token));
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("User cannot be fetched.");
      }
    }

    const token = localStorage.getItem("token");
    if (token) {
      getUserInfo(token);
    } else {
      router.push("/auth/login");
    }

    async function getAllQuizzes(id: string, token: string) {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quiz`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.data?.success) {
          toast.success(response?.data?.message);
          setQuizzes(response?.data?.data);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Questions cannot be fetched.");
      }
    }

    getAllQuizzes(user._id, user.token);
  }, [user._id, user.token, dispatch, router]);

  return (
    <div className="flex items-start justify-center min-h-screen p-2 py-24">
      <div className="w-full max-w-4xl">
        {quizzes ? (
          <>
            <h1 className="text-3xl text-center font-semibold mb-4">Quizzes</h1>
            <DataTable columns={columns} data={quizzes} />
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
