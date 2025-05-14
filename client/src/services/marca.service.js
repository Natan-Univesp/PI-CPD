import axios from "axios";
import Cookies from "js-cookie";

const localServer = `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`;

export async function getAllMarcasService() {
   const res = await axios.get(`${localServer}/marcas`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })

   return res;
}

export async function getAllMarcasForSelectService() {
   const res = await axios.get(`${localServer}/marcas/select-options`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })

   return res;
}

export async function getAllMarcasWithTonersForSelectService() {
   const res = await axios.get(`${localServer}/marcas/toners/select-options`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })

   return res;
}

export async function getAllMarcasWithCilindrosForSelectService() {
   const res = await axios.get(`${localServer}/marcas/cilindros/select-options`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })

   return res;
}

export async function getAllMarcasWithTintasForSelectService() {
   const res = await axios.get(`${localServer}/marcas/tintas/select-options`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })

   return res;
}

export async function getMarcaByIdService(id) {
   const res = await axios.get(`${localServer}/marcas/${id}`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function createMarcaService(body) {
   const { marca, img } = body;
   const formData = new FormData();

   formData.append("marca", marca);
   formData.append("image", img[0]);
   
   const res = await axios.post(`${localServer}/marcas`, formData, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
         "Content-Type": "multipart/form-data"
      }
   })
   return res;
}

export async function updateMarcaService(id, body) {
   const formData = new FormData();
   if(body?.img) {
      formData.append("image", body.img[0]);
   }
   if(body?.marca) {
      formData.append("marca", body.marca)
   }
   const res = await axios.patch(`${localServer}/marcas/${id}`, formData, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
         "Content-Type": "multipart/form-data"
      }
   })
   return res;
}