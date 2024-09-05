import { useEffect } from "react";
import { FirebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import { login, logout } from "../store/auth";

export const useCheckAuth = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());

      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return status;
};
