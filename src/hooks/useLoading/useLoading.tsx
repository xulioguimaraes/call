import { Loading } from "@/components/Loading/Loading";
import { createContext, ReactNode, useContext, useState } from "react";
interface LoadingProviderProps {
  children: ReactNode;
}

interface ILoadingProvider {
  isOpen: boolean;
  showLoading: () => void;
  closedLoading: () => void;
}

const LoadingContext = createContext({} as ILoadingProvider);

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isOpen, setIsLoading] = useState(true);
  const showLoading = () => {
    setIsLoading(true);
  };
  const closedLoading = () => {
    setIsLoading(false);
  };
  return (
    <LoadingContext.Provider
      value={{
        isOpen,
        showLoading,
        closedLoading,
      }}
    >
      <Loading isOpen={isOpen} />
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
