"use client";
import { SnackbarProvider } from "@/app/context/SnackbarContext";
import { RootState } from "@/app/lib/store";
import RecipeFormContainer from "@/components/RecipeFormContainer/RecipeFormContainer";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function UpdateRecipe() {
  const params = useParams();
  const recipeId = params?.id;

  const selectedRecipe = useSelector((state: RootState) =>
    state.recipes.recipes.find((r) => r.id === recipeId)
  );

  return (
    <SnackbarProvider>
      <RecipeFormContainer recipe={selectedRecipe} />
    </SnackbarProvider>
  );
}
