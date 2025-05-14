import axios from "axios";
import Cookies from "js-cookie";

const localServer = `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`;

/* 
==================================
method = GET
==================================
*/

//Toners
export async function getAllRetiradasTonersService() {
   const res = await axios.get(`${localServer}/retiradas/toners`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function getAllRetiradasTonersByFilterService(params) {
   const {orderBy, setor} = params;
   const res = await axios.get(`${localServer}/retiradas/toners/filter`, {
      params: {
         orderBy,
         filterOptions: {
            setor
         }
      },
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}


//Cilindros
export async function getAllRetiradasCilindrosService() {
   const res = await axios.get(`${localServer}/retiradas/cilindros`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function getAllRetiradasCilindrosByFilterService(params) {
   const {orderBy, setor} = params;
   const res = await axios.get(`${localServer}/retiradas/cilindros/filter`, {
      params: {
         orderBy,
         filterOptions: {
            setor
         }
      },
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}


//Tintas
export async function getAllRetiradasTintasService() {
   const res = await axios.get(`${localServer}/retiradas/tintas`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function getAllRetiradasTintasByFilterService(params) {
   const {orderBy, setor} = params;
   const res = await axios.get(`${localServer}/retiradas/tintas/filter`, {
      params: {
         orderBy,
         filterOptions: {
            setor
         }
      },
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
export async function createRetiradaSupplyService(body) {
   const res = await axios.post(`${localServer}/retiradas`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}