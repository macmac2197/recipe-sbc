"use client";

import { useRef } from "react";
import { Recipe } from "./lib/features/recipes/recipesSlice";
import { AppStore, makeStore } from "./lib/store";
import { Provider } from "react-redux";
import { initializeRecipes } from "./lib/features/recipes/recipesSlice";

export default function StoreProvider({
  recipes,
  children,
}: {
  recipes: Recipe[];
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeRecipes(recipes));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
