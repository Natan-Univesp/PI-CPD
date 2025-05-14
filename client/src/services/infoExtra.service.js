import axios from "axios";
import Cookies from "js-cookie";

const localServer = `http://${import.meta.env.VITE_SERVER_HOST}:${
   import.meta.env.VITE_SERVER_PORT
}`;

/* 
==================================
total de suprimentos cadastrados
==================================
*/
export async function getTotalRegisteredTonersService() {
   const res = await axios.get(`${localServer}/infos-extras/toners/total-registered`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getTotalRegisteredCilindrosService() {
   const res = await axios.get(`${localServer}/infos-extras/cilindros/total-registered`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getTotalRegisteredTintasService() {
   const res = await axios.get(`${localServer}/infos-extras/tintas/total-registered`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}


/* 
==================================
total de suprimentos retirados
==================================
*/
export async function getTotalRetiradasTonersService() {
   const res = await axios.get(`${localServer}/infos-extras/toners/total-withdrawn`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getTotalRetiradasCilindrosService() {
   const res = await axios.get(`${localServer}/infos-extras/cilindros/total-withdrawn`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getTotalRetiradasTintasService() {
   const res = await axios.get(`${localServer}/infos-extras/tintas/total-withdrawn`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}


/* 
==================================
suprimentos mais retirados no mês
==================================
*/
export async function getMostRetiradaTonerOfTheMonthService() {
   const res = await axios.get(`${localServer}/infos-extras/toners/most-withdrawn`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getMostRetiradaCilindroOfTheMonthService() {
   const res = await axios.get(`${localServer}/infos-extras/cilindros/most-withdrawn`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getMostRetiradaTintaOfTheMonthService() {
   const res = await axios.get(`${localServer}/infos-extras/tintas/most-withdrawn`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}


/* 
==================================
total de suprimentos solicitados
==================================
*/
export async function getTotalPendingRequestsService() {
   const res = await axios.get(`${localServer}/infos-extras/requests/total`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getTotalRequestedTonersService() {
   const res = await axios.get(`${localServer}/infos-extras/toners/total-requested`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getTotalRequestedCilindrosService() {
   const res = await axios.get(`${localServer}/infos-extras/cilindros/total-requested`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getTotalRequestedTintasService() {
   const res = await axios.get(`${localServer}/infos-extras/tintas/total-requested`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}


/* 
==================================
usuários ativos
==================================
*/
export async function getTotalUsersService() {
   const res = await axios.get(`${localServer}/infos-extras/users/total`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getTotalActiveUsersService() {
   const res = await axios.get(`${localServer}/infos-extras/users/active/total`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}