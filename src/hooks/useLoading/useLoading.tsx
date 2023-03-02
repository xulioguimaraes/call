import { Loading } from "@/components/Loading/Loading";
import { createContext, ReactNode, useContext, useState } from "react";
interface LoadingProviderProps {
  children: ReactNode;
}

interface ILoadingProvider {
  isOpen: boolean;
  onChange: () => void;
}

const LoadingContext = createContext({} as ILoadingProvider);

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isOpen, setIsLoading] = useState(false);
  const handleChange = () => {
    console.log("Loading");
    setIsLoading((oldValue) => !oldValue);
  };
  return (
    <LoadingContext.Provider
      value={{
        isOpen,
        onChange: handleChange,
      }}
    >
      <Loading isOpen={isOpen} />
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
