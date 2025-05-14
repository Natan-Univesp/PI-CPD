import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
   getMostRetiradaCilindroOfTheMonthService,
   getMostRetiradaTintaOfTheMonthService,
   getMostRetiradaTonerOfTheMonthService,
   getTotalActiveUsersService,
   getTotalPendingRequestsService,
   getTotalRegisteredCilindrosService,
   getTotalRegisteredTintasService,
   getTotalRegisteredTonersService,
   getTotalRequestedCilindrosService,
   getTotalRequestedTintasService,
   getTotalRequestedTonersService,
   getTotalRetiradasCilindrosService,
   getTotalRetiradasTintasService,
   getTotalRetiradasTonersService,
   getTotalUsersService,
} from "../services/infoExtra.service";

const InfoExtraContext = createContext(null);

export function InfoExtraProvider({ children }) {
   const [homeStats, setHomeStats] = useState();
   const [tonerStats, setTonerStats] = useState();
   const [cilindroStats, setCilindroStats] = useState();
   const [tintaStats, setTintaStats] = useState();
   const [adminStats, setAdminStats] = useState();

   const getAllHomePageStats = async () => {
      const resToner = await getTotalRegisteredTonersService();
      const resCilindro = await getTotalRegisteredCilindrosService();
      const resTinta = await getTotalRegisteredTintasService();
      const resPendingRequest = await getTotalPendingRequestsService();
      const { total_registered: totalTonerRegistered } = resToner.data;
      const { total_registered: totalCilindroRegistered } = resCilindro.data;
      const { total_registered: totalTintaRegistered } = resTinta.data;
      const { total_requested: totalRequested } = resPendingRequest.data;
      setHomeStats({
         totalTonerRegistered: String(totalTonerRegistered),
         totalCilindroRegistered: String(totalCilindroRegistered),
         totalTintaRegistered: String(totalTintaRegistered),
         totalRequested: String(totalRequested),
      });
   };

   const getAllTonerPageStats = async () => {
      const resRegToner = await getTotalRegisteredTonersService();
      const resRetToner = await getTotalRetiradasTonersService();
      const resReqToner = await getTotalRequestedTonersService();
      const resMostReqToner = await getMostRetiradaTonerOfTheMonthService();
      const { total_registered: totalRegistered } = resRegToner.data;
      const { total_retirada: totalRetirada } = resRetToner.data;
      const { total_requested: totalRequested } = resReqToner.data;
      const { modelo: mostRequested } = resMostReqToner.data;
      setTonerStats({
         totalRegistered: String(totalRegistered),
         totalRetirada: String(totalRetirada),
         totalRequested: String(totalRequested),
         mostRequested: String(mostRequested),
      });
   };

   const getAllCilindroPageStats = async () => {
      const resRegCilindro = await getTotalRegisteredCilindrosService();
      const resRetCilindro = await getTotalRetiradasCilindrosService();
      const resReqCilindro = await getTotalRequestedCilindrosService();
      const resMostReqCilindro = await getMostRetiradaCilindroOfTheMonthService();
      const { total_registered: totalRegistered } = resRegCilindro.data;
      const { total_retirada: totalRetirada } = resRetCilindro.data;
      const { total_requested: totalRequested } = resReqCilindro.data;
      const { modelo: mostRequested } = resMostReqCilindro.data;
      setCilindroStats({
         totalRegistered: String(totalRegistered),
         totalRetirada: String(totalRetirada),
         totalRequested: String(totalRequested),
         mostRequested: String(mostRequested),
      });
   };

   const getAllTintaPageStats = async () => {
      const resRegTinta = await getTotalRegisteredTintasService();
      const resRetTinta = await getTotalRetiradasTintasService();
      const resReqTinta = await getTotalRequestedTintasService();
      const resMostReqTinta = await getMostRetiradaTintaOfTheMonthService();
      const { total_registered: totalRegistered } = resRegTinta.data;
      const { total_retirada: totalRetirada } = resRetTinta.data;
      const { total_requested: totalRequested } = resReqTinta.data;
      const { modelo: mostRequested } = resMostReqTinta.data;
      setTintaStats({
         totalRegistered: String(totalRegistered),
         totalRetirada: String(totalRetirada),
         totalRequested: String(totalRequested),
         mostRequested: String(mostRequested),
      });
   };

   const getAllAdminPageStats = async () => {
      const resUser = await getTotalUsersService();
      const resActiveUser = await getTotalActiveUsersService();
      const { total_users: totalUsers } = resUser.data;
      const { total_users: totalActiveUsers } = resActiveUser.data;
      setAdminStats({
         totalUsers: String(totalUsers),
         totalActiveUsers: String(totalActiveUsers)
      }) 
   }


   // const initStats = async () => {
   //    try {
   //       await getAllHomePageStats();
   //       await getAllTonerPageStats();
   //       await getAllCilindroPageStats();
   //       await getAllTintaPageStats();
   //       await getAllAdminPageStats();
   //    } catch (error) {
   //       console.log(error);
   //    }
   // }

   // useEffect(() => {
   //    initStats();
   // }, []);

   return(
      <InfoExtraContext.Provider value={{
         homeStats,
         tonerStats,
         cilindroStats,
         tintaStats,
         adminStats,
         getAllHomePageStats,
         getAllTonerPageStats,
         getAllCilindroPageStats,
         getAllTintaPageStats,
         getAllAdminPageStats
      }}>
         {children}
      </InfoExtraContext.Provider>
   )

}

// eslint-disable-next-line react-refresh/only-export-components
export const useInfoExtra = () => useContext(InfoExtraContext);

InfoExtraProvider.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
   ]),
}
