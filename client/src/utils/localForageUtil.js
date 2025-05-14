import localforage from "localforage";

async function setWithExpiration(key, value, expiresInHours) {
   const now = new Date().getTime();
   // Converte para milissegundos
   const expirationTime =  now + (expiresInHours * 60 * 60 * 1000);

   const item = {
      ...value,
      expires: expirationTime 
   }

   await localforage.setItem(key, item);

}

async function getWithExpiration(key) {
   const item = await localforage.getItem(key);
   
   if(!item) {
      return null;
   }

   const now = new Date().getTime();
   
   if(now > item.expires) {
      await localforage.removeItem(key);
      return "INFO_EXPIRED";
   }

   return item

}

export default { getWithExpiration, setWithExpiration };