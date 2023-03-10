import { AiFillHome } from "react-icons/ai";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaUser } from "react-icons/fa";

export const routers = [
  {
    icon: AiFillHome,
    path: "/admin",
    name: "Home",
  },
  {
    path: "/financeiro",
    icon: MdOutlineAttachMoney,
    name: "Financeiro",
  },
  {
    path: "/cadastro",
    icon: FaUser,
    name: "Cadastro",
  },
];
