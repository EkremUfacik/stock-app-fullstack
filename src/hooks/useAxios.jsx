import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const useAxios = () => {
  const { token } = useSelector((state) => state.auth);

  //   //* local storage'dan token'ı oku
  //   const escapedToken = JSON.parse(localStorage.getItem("persist:root"))?.token;
  //   const token = escapedToken && JSON.parse(escapedToken);

  const axiosWithToken = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Token ${token}` },
  });

  return { axiosWithToken };
};

export default useAxios;
