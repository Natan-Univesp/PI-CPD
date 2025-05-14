import axios from "axios";
import Cookies from "js-cookie";

const localServer = `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`;

/* 
==================================
method = GET
==================================
*/
export async function getAllSolicitacoesService() {
   const res = await axios.get(`${localServer}/solicitacoes`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }  
   });
   return res;
}

/* 
==================================
method = POST
==================================
*/
export async function insertReqSuppliesService(body) {
   const res = await axios.post(`${localServer}/solicitacoes`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

/* 
==================================
method = DELETE
==================================
*/
export async function deleteSupplyRequestService(id) {
   const res = await axios.delete(`${localServer}/solicitacoes/suprimentos/${id}`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}