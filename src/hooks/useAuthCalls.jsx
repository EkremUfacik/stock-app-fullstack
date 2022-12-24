import { useDispatch } from "react-redux";
import axios from "axios";
import {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  fetchFail,
} from "../features/authSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/auth/login/`,
        userInfo
      );

      dispatch(loginSuccess(data));
      toast.success("Login Performed");
      navigate("/stock");
    } catch (err) {
      dispatch(fetchFail());
      toast.error("Login can not be performed");
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axios.post(`${BASE_URL}account/auth/logout/`);
      dispatch(logoutSuccess());
      toast.success("Logout Performed");
      navigate("/");
    } catch (err) {
      dispatch(fetchFail());
      toast.error("Logout can not be performed");
    }
  };

  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/register/`,
        userInfo
      );
      dispatch(registerSuccess(data));
      toast.success("Register Performed");
      navigate("/stock");
    } catch (err) {
      dispatch(fetchFail());
      toast.error("Register can not be performed");
    }
  };

  return {
    login,
    logout,
    register,
  };
};

export default useAuthCalls;
