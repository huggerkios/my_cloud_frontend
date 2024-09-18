import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import loginUser from "../../../api/loginUser";

function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const submit = async (data) => {
    try {
      setError(null);
      await loginUser(data.username, data.password);
      reset();
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(error.detail);
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
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 4,
                message: "Минимальная длина 4 символа",
              },
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
          Password:
          <input
            type="password"
            className="form-control"
            {...register("password", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 6,
                message: "Минимальный пароль от 6 символов",
              },
            })}
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
      <button type="submit" className="btn" disabled={!isValid}>
        Login
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default LoginForm;
