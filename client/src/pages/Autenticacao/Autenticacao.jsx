import { useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
// Context
import { AlertProvider, useAlert } from "../../Context/AlertContext";
import { useUser } from "../../Context/UserContext";
// Componentes
import { PassEye } from "../../components/PassEye/PassEye";
import { ValidateAuth } from "../../components/RoutesValidate/ValidateAuth";
import styles from "./Autenticacao.module.css";
// Services
import { loginService } from "../../services/user.service";

import { useNavigate } from "react-router-dom";
import localforage from "localforage";

export function Autenticacao() {
    const { setUser } = useUser();
    const { showErrorAlert } = useAlert();
    const [isPassLoginVisible, setIsPassLoginVisible] = useState(false);
    const navigate = useNavigate();

    const showHiddenPassLogin = () => setIsPassLoginVisible((prevValue) => !prevValue);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({defaultValues: {userName: "", userPass: ""}});

    const inputUserName = register("userName", {required: "Campo Vazio!"});
    const inputUserPass = register("userPass", {required: "Campo Vazio!"});

    const handleLogin = async ({userName, userPass}) => {
        try {
            const res = await loginService({userName, password: userPass});
            const { user, nivel_acesso } = res.data;

            Cookies.set("token", res.data.token, {expires: 1});
            await localforage.setItem("user", {user, nivel_acesso});
            setUser({user, nivel_acesso});

            navigate("/");
            

        } catch (error) {
            if(error?.response?.data) {
                const errInfo = error.response.data;
                showErrorAlert({
                    title: errInfo.errMessage
                })
            } else {
                console.log(error);
            }
            
            
        }

    }

    return(
        <AlertProvider>
            <ValidateAuth>
                <div className={styles.contentContainer}>
                    <form action="" className={styles.formAuth} onSubmit={handleSubmit(handleLogin)}>
                        <h1>Login</h1>
                        <div className={`${styles.authInputContainer} ${errors.userName ? styles.inputError : ""}`}>
                            <label htmlFor="user">Usuário</label>
                            <input type="text" {...inputUserName}/>
                            {errors?.userName && <span className={styles.customErrorMsg}>{errors?.userName?.message}</span>}
                        </div>
                        <div className={styles.authSpecialInput}>
                            <div className={`${styles.authInputContainer} ${errors.userPass ? styles.inputError : ""}`}>
                                <label htmlFor="passUser">Senha</label>
                                <input type={isPassLoginVisible ? "text" : "password"} {...inputUserPass}/>
                                {errors?.userPass && <span className={styles.customErrorMsg}>{errors?.userPass?.message}</span>}
                            </div>
                            <PassEye isVisible={isPassLoginVisible} classNameRef="passEyeForm" handleOnClick={showHiddenPassLogin}/>
                        </div>
                        <button>Login</button>
                    </form>
                </div>
            </ValidateAuth>
        </AlertProvider>
    )
}