import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllDefaultUsersService } from "../services/admin.service";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
   const [allUsers, setAllUsers] = useState();
   const [isLoading, setIsLoading] = useState(true);

   const getAllUsers = async () => {
      const res = await getAllDefaultUsersService();
      setAllUsers(res.data);
      setIsLoading(false);
   };

   const init = async () => {
      try {
         await getAllUsers();
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      init();
   }, []);

   return (
      <AdminContext.Provider value={{ allUsers, setAllUsers, getAllUsers, isLoading, setIsLoading }}>
         {children}
      </AdminContext.Provider>
   );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => useContext(AdminContext);

AdminProvider.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.element, 
      PropTypes.arrayOf(PropTypes.element)
   ]),
};
