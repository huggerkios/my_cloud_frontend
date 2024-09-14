import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as Yup from "yup";
import registerUser from "../../../api/registerUser";

function RegisterForm() {
  const navigate = useNavigate();
  Yup.addMethod(Yup.string, "email", function validateEmail(message) {
    return this.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message,
      name: "email",
      excludeEmptyString: true,
    });
  });
  
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Имя обязательно для заполнения")
      .matches(/^[a-zA-Z]/, "Начало с латинских символов")
      .matches(/^[a-zA-Z][a-zA-Z0-9]{3,19}$/, "Длина от 4 до 20 символов"),
    full_name: Yup.string()
      .required("Имя обязательно для заполнения")
      .min(4, " Не менее 4 символов"),
    email: Yup.string()
      .required("Email обязателен")
      .email("Некорректный email"),
    password: Yup.string()
      .required("Пароль обязателен")
      .min(6, "Пароль не менее 6 символов")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Должен содержать заглавную букву, цифру и  специальный символ"
      ),
    confirmPassword: Yup.string()
      .required("Повторный пароль обязателен")
      .oneOf([Yup.ref("password")], "Пароли должны совпадать"),
  });

  const formOptions = {
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm(formOptions);

  const submit = async (data) => {
    try {
      const response = await registerUser(
        data.username,
        data.full_name,
        data.email,
        data.password
      );
      reset();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <div className="formGroup">
        <label>
          Login:
          <input
            className="form-control"
            {...register("username", {
              required: "Имя обязательно для заполнения",
            })}
          />
          {errors?.username ? (
            <div className="error">
              {" "}
              {errors?.username?.message || "Error !"}
            </div>
          ) : (
            <div>&nbsp;</div>
          )}
        </label>
      </div>
      <div className="formGroup">
        <label>
          Name:
          <input
            className="form-control"
            {...register("full_name", {
              required: "Имя обязательно для заполнения",
            })}
          />
          {errors?.full_name ? (
            <div className="error">
              {" "}
              {errors?.full_name?.message || "Error !"}
            </div>
          ) : (
            <div>&nbsp;</div>
          )}
        </label>
      </div>
      <div className="formGroup">
        <label>
          Email:
          <input
            className="form-control"
            {...register("email", {
              required: "Поле обязательно для заполнения",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Некорректный email",
              },
            })}
          />
          {errors?.email ? (
            <div className="error"> {errors?.email?.message || "Error !"}</div>
          ) : (
            <div>&nbsp;</div>
          )}
        </label>
      </div>
      <div className="formGroup">
        <label>
          Password:
          <input
            type="password"
            className="form-control"
            {...register("password", {})}
          />
          {errors?.password ? (
            <div className="error">
              {errors?.password?.message || "Error !"}
            </div>
          ) : (
            <div>&nbsp;</div>
          )}
        </label>
      </div>
      <div className="formGroup">
        <label>
          Confirm Password:
          <input
            type="password"
            className="form-control"
            {...register("confirmPassword", {
              required: "Поле обязательно для заполнения",
            })}
          />
          {errors?.confirmPassword ? (
            <div className="error">
              {errors?.confirmPassword?.message || "Error !"}
            </div>
          ) : (
            <div>&nbsp;</div>
          )}
        </label>
      </div>
      <button type="submit" className="btn" disabled={!isValid}>
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
