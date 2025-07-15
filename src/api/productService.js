import axios from "axios";
import { url } from "./config";

export const getListProduct = () => {
  return axios.get(url);
};

export const putProduct = (product) => {
  const newUrl = url + `${product.id}`;
  return axios({
    url: newUrl,
    method: "PUT",
    data: product,
  });
};
