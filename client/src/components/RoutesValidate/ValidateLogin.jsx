import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAlert } from "../../Context/AlertContext";
import { getNecessaryInfoUser, logoutService } from "../../services/user.service";
import { useEffect } from "react";

export function ValidateLogin({children}) {
   const token = Cookies.get("token");
   const { showErrorAlert } = useAlert();

   const getLoggedUser = async () => {
      try {
         const res = await getNecessaryInfoUser();
         if(res.data) {
            const { status } = res.data;
            if(status !== "ativo") {
               showErrorAlert({
                  title: "Usuário INATIVO",
                  message: "O seu usuário não está mais ativo!"
               })
               await logoutService();
               return <Navigate to={"/auth"}/>
            }
         }
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      if(token) {
         getLoggedUser();
      }
      
   }, [])

   if(!token) {
      return <Navigate to={"/auth"}/>
   }

   return children;
}

ValidateLogin.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
   ]),
}