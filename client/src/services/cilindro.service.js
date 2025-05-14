import axios from "axios";
import Cookies from "js-cookie";

const localServer = `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`;

/* 
==================================
method = GET
==================================
*/
export async function getAllCilindrosService() {
   const res = await axios.get(`${localServer}/cilindros`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function getAllTrashCilindrosService() {
   const res = await axios.get(`${localServer}/cilindros/trash`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function getAllCilindrosByMarcaService(marcaId) {
   const res = await axios.get(`${localServer}/cilindros/marca/${marcaId}`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function getCilindroByIdService(id) {
   const res = await axios.get(`${localServer}/cilindros/${id}`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}



/* 
==================================
method = POST
==================================
*/
export async function createCilindroService(body) {
   const res = await axios.post(`${localServer}/cilindros`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}


/* 
==================================
method = PATCH
==================================
*/
export async function updateCilindroService(id, body) {
   const res = await axios.patch(`${localServer}/cilindros/${id}`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function reestoqueCilindroService(id, qtd_increment) {
   const res = await axios.patch(`${localServer}/cilindros/${id}/reestoque`, {qtd_increment}, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function moveCilindroToTrashService(id) {
   const situacao = "INATIVO";
   const res = await axios.patch(`${localServer}/cilindros/${id}/trash`, {situacao}, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function restoreCilindroService(id) {
   const situacao = "ATIVO";
   const res = await axios.patch(`${localServer}/cilindros/${id}/trash`, {situacao}, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}