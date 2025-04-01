import { useState } from "react";
import { Link } from "react-router";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import useSignup from "../../hook/useSignup";
import FormInput from "../../components/singup&login/FormInput";
import Button from "../../components/singup&login/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, error, isLoading } = useSignup();

  const signUpSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data) => {
    await signup(
      data.username,
      data.email,
      data.password,
      data.confirmPassword
    );
  };

  return (
    <div className="w-full flex flex-col justify-center items-center sm:h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-1 pt-15 pl-20 pr-20 pb-20 rounded-2xl border-white shadow-none sm:shadow-md">
          <h1 className="font-bold text-2xl flex justify-center text-[var(--primary-color)]">
            Create Your Account
          </h1>
          <FormInput
            title={"Username"}
            type={"text"}
            placeholder={"Enter your username"}
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mb-1 text-center">
              {errors.username.message}
            </p>
          )}
          <FormInput
            title={"Email"}
            type={"text"}
            placeholder={"Enter your email"}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-1 text-center">
              {errors.email.message}
            </p>
          )}
          <FormInput
            title={"Password"}
            type={showPassword ? "text" : "password"}
            placeholder={"Enter your password"}
            onToggle={() => {
              setShowPassword((p) => !p);
            }}
            toggleIcon={showPassword ? faEye : faEyeSlash}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-1 text-center">
              {errors.password.message}
            </p>
          )}
          <FormInput
            title={"Password"}
            type={showPassword ? "text" : "password"}
            placeholder={"Enter your password"}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mb-1 text-center">
              {errors.confirmPassword.message}
            </p>
          )}
          <Button disabled={isLoading} btnName={"Create an Account"} />
          {/* errors from back end and hook */}
          {error && (
            <div className="text-red-600 text-sm flex justify-center mb-3">
              {error}
            </div>
          )}

          <div className="flex justify-center cursor-pointer">
            Already have an account{" "}
            <h3 className="ml-2 font-bold  text-[var(--primary-color)]">
              <Link to={"/login"}>Login</Link>
            </h3>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
