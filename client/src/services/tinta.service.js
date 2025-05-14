import axios from "axios";
import Cookies from "js-cookie";

const localServer = `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`;

/* 
==================================
method = GET
==================================
*/
export async function getAllTintasService() {
   const res = await axios.get(`${localServer}/tintas`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function getAllTrashTintasService() {
   const res = await axios.get(`${localServer}/tintas/trash`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function getAllTintasByMarcaService(marcaId) {
   const res = await axios.get(`${localServer}/tintas/marca/${marcaId}`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}  

export async function getTintaByIdService(id) {
   const res = await axios.get(`${localServer}/tintas/${id}`, {
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
export async function createTintaService(body) {
   const res = await axios.post(`${localServer}/tintas`, body, {
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
export async function updateTintaService(id, body) {
   const res = await axios.patch(`${localServer}/tintas/${id}`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function reestoqueTintaService(id, qtd_increment) {
   const res = await axios.patch(`${localServer}/tintas/${id}/reestoque`, {qtd_increment}, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function moveTintaToTrashService(id) {
   const situacao = "INATIVO";
   const res = await axios.patch(`${localServer}/tintas/${id}/trash`, {situacao}, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function restoreTintaService(id) {
   const situacao = "ATIVO";
   const res = await axios.patch(`${localServer}/tintas/${id}/trash`, {situacao}, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}