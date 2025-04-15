import { Badge } from "@/components/ui/badge";
import AlertBox from "@/components/alertbox/AlertBox";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/hook/useAuthConext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { useDelete } from "@/hook/useDelete";
import { toast } from "sonner";
import ErrorBox from "./ErrorBox";
import CreateForm from "./CreateForm";
import { useContext, useState } from "react";
import { DataContext } from "@/context/DataContext";
import {
  faMoneyBillWave,
  faHome,
  faPlug,
  faShoppingCart,
  faCar,
  faShieldAlt,
  faUtensils,
  faCookie,
  faCouch,
  faPhoneAlt,
  faTv,
  faLaptop,
  faBriefcase,
  faCreditCard,
  faPiggyBank,
  faBuilding,
  faVideo,
  faStore,
  faDumbbell,
  faBookOpen,
  faGift,
  faPlane,
  faAmbulance,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
  Income: faMoneyBillWave,
  Rent: faHome,
  Utilities: faPlug,
  Groceries: faShoppingCart,
  Transportation: faCar,
  Insurance: faShieldAlt,
  "Dining Out": faUtensils,
  Snacks: faCookie,
  "Household Supplies": faCouch,
  "Phone & Internet": faPhoneAlt,
  "Streaming Services": faTv,
  "Software & Apps": faLaptop,
  "Work Expenses": faBriefcase,
  "Debt Payments": faCreditCard,
  "Savings & Investments": faPiggyBank,
  "Bank Fees": faBuilding,
  Entertainment: faVideo,
  Shopping: faStore,
  "Health & Fitness": faDumbbell,
  Education: faBookOpen,
  "Gifts & Donations": faGift,
  Travel: faPlane,
  Emergency: faAmbulance,
  "Kids & Pets": faPaw,
};

const List = ({ data, activeId, setActiveId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useAuthContext();
  const { datas, setDatas } = useContext(DataContext);

  const onActive = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id)); // have to use prev because useState is async
  };

  const { remove, error, setError } = useDelete();

  const del = async (id) => {
    const mes = await remove(id);

    if (mes) {
      setDatas((d) => d.filter((data) => data.id !== id));

      //Activate
      toast.success("List has been Deleted");
    }
  };

  const validDate = (date) => {
    const d = new Date(date);
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(d);
    const day = d.getDate();
    const year = d.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <>
      <div
        className={`transition-all duration-300 ease-out transform text-xl ${
          isEdit
            ? "opacity-0 scale-95 max-h-0 overflow-hidden"
            : "opacity-100 scale-100 max-h-[500px]"
        }`}
      >
        <div className="flex justify-center">
          <div className="border grid grid-cols-1 p-10 mt-5 w-230 rounded-xl bg-white">
            <div
              className="flex justify-around"
              onClick={() => onActive(data.id)}
            >
              <div className="flex gap-3">
                <div>
                  <FontAwesomeIcon icon={icons[`${data.category}`]} />
                </div>
                <h2 className="w-50 text-center">{data.category}</h2>
              </div>
              <div className="font-bold">
                <span
                  className={
                    data.transaction_type === "Income"
                      ? "text-[var(--primary-color)]"
                      : "text-red-600"
                  }
                >
                  {data.cost}
                </span>{" "}
                <span>{user.currency}</span>
              </div>
              <Badge variant="outline" className={"font-bold w-30"}>
                {data.transaction_type}
              </Badge>
              <div className="w-50 text-center">
                {validDate(data.created_at)}
              </div>
            </div>
            {/* I used Ai for animation.Ofc,I am not really good at making animation :> */}

            <div
              className={` text-sm transition-all duration-500 ease-out transform ${
                activeId !== data.id
                  ? "opacity-0 scale-95 max-h-0 overflow-hidden "
                  : "opacity-100 scale-100 max-h-[500px] mt-5"
              }`}
            >
              <div className="mt-3">{data.note}</div>
              <div className="flex justify-end gap-3">
                <AlertBox
                  btn={"Delete"}
                  btnClassName={
                    "border border-white bg-red-700 hover:bg-red-900"
                  }
                  title={"Are you absolutely sure?"}
                  description={"This action cannot be undone."}
                  type={"button"}
                  onClick={() => {
                    del(data.id);
                  }}
                />
                <Button
                  type="submit"
                  className={"bg-black text-white"}
                  onClick={() => {
                    setIsEdit(true);
                  }}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>
        {error && (
          <ErrorBox error={error} setError={setError} errorText={"Error!"} />
        )}
      </div>
      <div
        className={`transition-all duration-300 ease-out transform ${
          !isEdit
            ? "opacity-0 scale-95 max-h-0 overflow-hidden"
            : "opacity-100 scale-100 max-h-[500px]"
        }`}
      >
        <CreateForm
          cost={data.cost}
          type={data.transaction_type}
          category={data.category}
          note={data.note}
          btnName={"Save Changes"}
          setIsEdit={setIsEdit}
          mode={"edit"}
          id={activeId}
        />
      </div>
    </>
  );
};

export default List;
