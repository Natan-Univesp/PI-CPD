import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

export function ValidateAdmin({children}) {
   const {user} = useUser();

   if(user?.nivel_acesso > 1) {
      return <Navigate to={"/"}/>
   }

   return children;
}

ValidateAdmin.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
   ]),
}