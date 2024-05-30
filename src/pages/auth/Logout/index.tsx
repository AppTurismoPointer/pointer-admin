import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/hooks";
import { logout } from "@/store/slices/auth.slice";

export function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());

    navigate("/");
  }, []);

  return <></>;
}
