import axios from "axios";
import Cookies from "js-cookie";
import localforage from "localforage";

const localServer = `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`;

export async function loginService(body) {
   const res = await axios.post(`${localServer}/auth`, body);
   return res;
}

export async function logoutService() {
   Cookies.remove("token");
   await localforage.removeItem("user");
}

export async function getNecessaryInfoUser() {
   const res = await axios.get(`${localServer}/users/logged`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}