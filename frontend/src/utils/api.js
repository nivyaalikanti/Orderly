// centralized api setup
import axios from "axios";
import qs from "qs";
const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true, // Include cookies in requests
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "brackets" }), // Handle array parameters

});
export default api;