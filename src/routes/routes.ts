import { AiFillHome } from "react-icons/ai";
import { MdOutlineAttachMoney } from "react-icons/md";

export const routers = [
  {
    icon: AiFillHome,
    path: "/",
    name: "Home",
  },
  {
    path: "/financeiro",
    icon: MdOutlineAttachMoney,
    name: "Financeiro",
  },
  {
    path: "/",
    icon: AiFillHome,
    name: "Cadastro",
  },
];
