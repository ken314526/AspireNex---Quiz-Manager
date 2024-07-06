"use client";
import Loading from "@/components/Loading";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setToken, setUser } from "@/lib/slices/userSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUserInfo(token: string) {
      try {
        setLoading(true);
        const response = await axios({
          method: "get",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false);

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
  }, [router, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen py-24">
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <h1 className="text-3xl text-center font-semibold mb-4">
            Welcome {user.name} !
          </h1>
          <Link href="/quizzes">
            <span className="block bg-blue-500 text-white text-center p-6 rounded-lg shadow-md hover:bg-blue-600 transition">
              <h2 className="text-2xl font-bold">Quizzes</h2>
            </span>
          </Link>
          <Link href="/reports">
            <span className="block bg-green-500 text-white text-center p-6 rounded-lg shadow-md hover:bg-green-600 transition">
              <h2 className="text-2xl font-bold">Reports</h2>
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
