import { useState } from "react";
import { useAuthContext } from "@/hook/useAuthConext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputForm from "@/components/setting/Input";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AlertBox from "@/components/alertbox/AlertBox";
import { useEditInfos } from "@/hook/useEditInfos";
import { Toaster } from "@/components/ui/sonner";
import ErrorBox from "@/components/expense/ErrorBox";
import { toast } from "sonner";

const Setting = () => {
  const { user, dispatch } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const { editInfo, infoError, setInfoError } = useEditInfos();

  const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  const passwordSchema = z.object({
    oldPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  });

  const {
    register: registerInfos,
    formState: { errors: infosErrors },
    handleSubmit: handleInfosSubmit,
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const {
    register: registerPass,
    formState: { errors: passErrors },
    handleSubmit: handlePassSubmit,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmitInfos = async (data) => {
    if (user.name === data.name && user.email === data.email) {
      setInfoError(
        "Looks like your info is still the same. Make some changes first!"
      );
      return;
    }
    const newInfos = await editInfo(data.name, data.email);
    console.log(newInfos);

    if (newInfos?.id) {
      toast.success("Your info has been changed");

      //will trigger after 3s
      setTimeout(() => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("user");
      }, 3000);
    }
  };

  const onSubmitPass = async (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        {/* Profile */}
        <div>
          <Avatar className={"w-24 h-auto"}>
            <AvatarImage src={user.img_url} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* Infos */}
        <form action="submit" onSubmit={handleInfosSubmit(onSubmitInfos)}>
          <div className="border-b w-100 font-bold mt-10 mb-5">User infos</div>
          <div className="flex items-center flex-col">
            <InputForm
              type={"text"}
              title={"Username"}
              register={registerInfos}
              schema={"name"}
            />
            {infosErrors.name && (
              <p className="text-red-500 text-sm mb-1 mt-2">
                {infosErrors.name.message}
              </p>
            )}

            <InputForm
              type={"email"}
              title={"Email"}
              register={registerInfos}
              schema={"email"}
            />
            {infosErrors.email && (
              <p className="text-red-500 text-sm mb-1 mt-2">
                {infosErrors.email.message}
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
                  handleInfosSubmit(onSubmitInfos)(); //call back func
                }}
              />
            </div>
          </div>
        </form>

        {/* Password */}
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
        {/* Error box */}
        {infoError && (
          <ErrorBox
            error={infoError}
            setError={setInfoError}
            errorText={"Error!"}
          />
        )}

        <Toaster richColors />
      </div>
    </>
  );
};

export default Setting;
