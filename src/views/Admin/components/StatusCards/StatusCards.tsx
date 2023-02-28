import { StatusCard } from "@/components/StatusCard";
import { SimpleGrid } from "@chakra-ui/react";
import { BiDollarCircle } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

export const StatusCards = () => {
  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 4, sm: 2 }}
        spacing={{ base: 5, lg: 5 }}
      >
        <StatusCard
          title={"DINHEIRO DE HOJE"}
          stat={"R$ 53,89"}
          icon={<BsPerson size={"3em"} />}
        />
        <StatusCard
          title={"USUÁRIOS DE HOJE"}
          stat={"1,000"}
          icon={<FiServer size={"3em"} />}
        />
        <StatusCard
          title={"NOVOS CLIENTES"}
          stat={"7"}
          icon={<GoLocation size={"3em"} />}
        />
        <StatusCard
          title={"TOTAL SALES"}
          stat={"R$ 1002,89"}
          icon={<BiDollarCircle size={"3em"} />}
        />
      </SimpleGrid>
    </>
  );
};
