import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export function ValidateAuth({children}) {
   const token = Cookies.get("token");

   if(token) {
      return <Navigate to={"/"}/>
   }

   return children;
}

ValidateAuth.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
   ]),
}