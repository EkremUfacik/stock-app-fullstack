import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchFail,
  fetchStart,
  getSuccess,
  getProCatBrandsSuccess,
  getAllStockSuccess,
} from "../features/stockSlice";
import useAxios from "./useAxios";

const useStockCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  const getStockData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`stock/${url}/`);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getFirms = () => getStockData("firms");
  const getSales = () => getStockData("sales");
  const getCategories = () => getStockData("categories");
  const getBrands = () => getStockData("brands");
  const getProducts = () => getStockData("products");
  const getPurchases = () => getStockData("purchases");

  const getProCatBrands = async () => {
    dispatch(fetchStart());
    try {
      const [products, categories, brands] = await Promise.all([
        axiosWithToken.get("stock/products/"),
        axiosWithToken.get("stock/categories/"),
        axiosWithToken.get("stock/brands/"),
      ]);
      dispatch(
        getProCatBrandsSuccess([products?.data, categories?.data, brands?.data])
      );
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const getAllStockData = async () => {
    dispatch(fetchStart());
    try {
      const [purchases, firms, brands, sales, products, categories] =
        await Promise.all([
          axiosWithToken.get("/stock/purchases"),
          axiosWithToken.get("/stock/firms"),
          axiosWithToken.get("/stock/brands"),
          axiosWithToken.get("/stock/sales"),
          axiosWithToken.get("/stock/products"),
          axiosWithToken.get("/stock/categories"),
        ]);
      dispatch(
        getAllStockSuccess([
          purchases.data,
          firms.data,
          brands.data,
          sales.data,
          products.data,
          categories.data,
        ])
      );
    } catch (err) {
      dispatch(fetchFail());
    }
  };

  const deleteStockData = async (url, id) => {
    try {
      await axiosWithToken.delete(`stock/${url}/${id}/`);
      toast.success(
        `${url[0].toUpperCase() + url.slice(1)} Successfuly Deleted`
      );
      getStockData(url);
    } catch (error) {
      console.log(error);
      toast.error(`${url[0].toUpperCase() + url.slice(1)} can not be deleted`);
    }
  };

  const deleteFirm = (id) => deleteStockData("firms", id);
  const deleteBrand = (id) => deleteStockData("brands", id);
  const deleteProduct = (id) => deleteStockData("products", id);
  const deletePurchase = (id) => deleteStockData("purchases", id);

  const postStockData = async (info, url) => {
    try {
      await axiosWithToken.post(`stock/${url}/`, info);
      toast.success(`${url[0].toUpperCase() + url.slice(1)} Successfuly Added`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toast.error(`${url[0].toUpperCase() + url.slice(1)} can not be added`);
    }
  };

  const postFirm = (info) => postStockData(info, "firms");
  const postBrand = (info) => postStockData(info, "brands");
  const postProduct = (info) => postStockData(info, "products");
  const postPurchase = (info) => postStockData(info, "purchases");
  const postSale = (info) => postStockData(info, "sales");

  const putStockData = async (info, url) => {
    try {
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info);
      toast.success(
        `${url[0].toUpperCase() + url.slice(1)} Successfuly Updated`
      );
      getStockData(url);
    } catch (error) {
      console.log(error);
      toast.error(`${url[0].toUpperCase() + url.slice(1)} can not be updated`);
    }
  };

  const putFirm = (info) => putStockData(info, "firms");
  const putBrand = (info) => putStockData(info, "brands");
  const putProduct = (info) => putStockData(info, "products");
  const putPurchase = (info) => putStockData(info, "purchases");
  const putSale = (info) => putStockData(info, "sales");

  return {
    getAllStockData,
    getFirms,
    getSales,
    getCategories,
    getBrands,
    getProducts,
    getPurchases,
    getProCatBrands,
    deleteFirm,
    deleteBrand,
    deleteProduct,
    deletePurchase,
    postFirm,
    postBrand,
    postProduct,
    postPurchase,
    postSale,
    putFirm,
    putBrand,
    putProduct,
    putPurchase,
    putSale,
  };
};

export default useStockCalls;
