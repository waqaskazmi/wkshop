import axios from "axios";
import logger from "./loggingService";
import { toast } from "react-toastify";

//axios.defaults.baseURL = process.env.WKshop_API_URL;
//axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.baseURL = "https://wkshop-waqaskazmi.vercel.app/api";
//fkamkl

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if(!expectedError){
    logger.log(error);
    toast.error("An Unexpected Error has occurred");
  }
  return Promise.reject(error);
});

function setJwt(jwt){
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
    get : axios.get,
    post : axios.post,
    put : axios.put,
    delete : axios.delete,
    setJwt
}
