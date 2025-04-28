import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditInfos } from "@/hook/useEditInfos";
import { toast } from "sonner";
import { useAuthContext } from "@/hook/useAuthConext";
import InputForm from "./Input";
import AlertBox from "../alertbox/AlertBox";
import ErrorBox from "../expense/ErrorBox";

const Infos = () => {
  const { editInfo, infoError, setInfoError } = useEditInfos();
  const { user, dispatch } = useAuthContext();

  const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
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

  //User
  const onSubmitInfos = async (data) => {
    if (user.name === data.name && user.email === data.email) {
      setInfoError(
        "Looks like your info is still the same. Make some changes first!"
      );
      return;
    }
    const newInfos = await editInfo(data.name, data.email);

    if (newInfos) {
      toast.success(newInfos);
    }
  };

  return (
    <>
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
      {infoError && (
        <ErrorBox error={infoError} setError={infoError} errorText={"Error!"} />
      )}
    </>
  );
};

export default Infos;
