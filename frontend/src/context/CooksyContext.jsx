import { createContext, useContext, useState } from "react";

const CooksyContext = createContext(null);

export function CooksyProvider({ children }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  const [preferences, setPreferences] = useState({
    dietary: [],
    cuisine: "Indian",
    servings: 2,
    maxTime: 30,
  });

  return (
    <CooksyContext.Provider
      value={{
        uploadedImage,
        setUploadedImage,
        ingredients,
        setIngredients,
        preferences,
        setPreferences,
      }}
    >
      {children}
    </CooksyContext.Provider>
  );
}

export function useCooksy() {
  const context = useContext(CooksyContext);

  if (!context) {
    throw new Error("useCooksy must be used inside CooksyProvider");
  }

  return context;
}