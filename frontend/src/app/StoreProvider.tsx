"use client";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Provider store={store}>
      <Navbar isLoggedIn={isLoggedIn} />
      {children}
    </Provider>
  );
}
