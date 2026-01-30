import {
  ChangeEvent,
  createContext,
  type ReactNode,
  useContext,
  useState,
} from "react";

type FormValues = {
  email: string;
  password: string;
};

type FormContextType = {
  values: FormValues;
  setValue: <K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) => void;
  reset: () => void;
};

const FormContext = createContext<FormContextType | null>(null);

export const useFormContextSafe = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContextSafe must be used inside FormProvider");
  }
  return context;
};

type FormProviderProps = {
  children: ReactNode;
};

export const FormProvider = ({ children }: FormProviderProps) => {
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const setValue = <K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const reset = () => {
    setValues({
      email: "",
      password: "",
    });
  };

  return (
    <FormContext.Provider value={{ values, setValue, reset }}>
      {children}
    </FormContext.Provider>
  );
};
