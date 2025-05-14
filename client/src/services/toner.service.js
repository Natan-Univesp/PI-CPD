import axios from "axios";
import Cookies from "js-cookie";

const localServer = `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`;

/* 
==================================
method = GET
==================================
*/
export async function getAllTonersService() {
   const res = await axios.get(`${localServer}/toners`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function getAllTrashTonersService() {
   const res = await axios.get(`${localServer}/toners/trash`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function getAllTonersByMarcaService(marcaId) {
   const res = await axios.get(`${localServer}/toners/marca/${marcaId}`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}  

export async function getTonerByIdService(id) {
   const res = await axios.get(`${localServer}/toners/${id}`, {
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
export async function createTonerService(body) {
   const res = await axios.post(`${localServer}/toners`, body, {
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
export async function updateTonerService(id, body) {
   const res = await axios.patch(`${localServer}/toners/${id}`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function reestoqueTonerService(id, qtd_increment) {
   const res = await axios.patch(`${localServer}/toners/${id}/reestoque`, {qtd_increment}, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function moveTonerToTrashService(id) {
   const situacao = "INATIVO";
   const res = await axios.patch(`${localServer}/toners/${id}/trash`, {situacao}, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function restoreTonerService(id) {
   const situacao = "ATIVO";
   const res = await axios.patch(`${localServer}/toners/${id}/trash`, {situacao}, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}