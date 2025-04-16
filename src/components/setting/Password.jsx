import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuthContext } from "@/hook/useAuthConext";
import InputForm from "./Input";
import AlertBox from "../alertbox/AlertBox";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEditPassword } from "@/hook/useEditPassword";
import ErrorBox from "../expense/ErrorBox";

const Password = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { editPass, passError, setPassError } = useEditPassword();
  const { user, dispatch } = useAuthContext();

  const passwordSchema = z.object({
    oldPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  });

  const {
    register: registerPass,
    formState: { errors: passErrors },
    handleSubmit: handlePassSubmit,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  //Password
  const onSubmitPass = async (data) => {
    if (data.oldPassword === data.newPassword) {
      setPassError(
        "Looks like your passwords are the same. Make some changes first!"
      );
      return;
    }
    const newPass = await editPass(data.oldPassword, data.newPassword);

    if (newPass) {
      toast.success(newPass);
    }
  };
  return (
    <>
      <form action="submit" onSubmit={handlePassSubmit(onSubmitPass)}>
        <div className="border-b w-100 font-bold mt-10 mb-5">Password</div>
        <div className="flex items-center flex-col">
          <InputForm
            type={"password"}
            title={"Old Password"}
            register={registerPass}
            schema={"oldPassword"}
            placeholder={"Your old password"}
          />
          {passErrors.oldPassword && (
            <p className="text-red-500 text-sm mb-1">
              {passErrors.oldPassword.message}
            </p>
          )}
          <InputForm
            type={showPassword ? "text" : "password"}
            title={"New Password"}
            register={registerPass}
            schema={"newPassword"}
            toggleIcon={showPassword ? faEye : faEyeSlash}
            onToggle={() => {
              setShowPassword((p) => !p);
            }}
            placeholder={"Your new password"}
          />
          {passErrors.newPassword && (
            <p className="text-red-500 text-sm mb-1 mt-2">
              {passErrors.newPassword.message}
            </p>
          )}
          <div className="flex justify-start w-85">
            <AlertBox
              btn={"Save Changes"}
              btnClassName={"border border-white mt-2"}
              title={"Are you absolutely sure?"}
              description={"This action cannot be undone."}
              type={"button"}
              onClick={() => {
                handlePassSubmit(onSubmitPass)(); //call back func
              }}
            />
          </div>
        </div>
      </form>
      {passError && (
        <ErrorBox
          error={passError}
          setError={setPassError}
          errorText={"Error!"}
        />
      )}
    </>
  );
};

export default Password;
