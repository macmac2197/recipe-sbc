"use client";

import { SnackbarProvider } from "@/app/context/SnackbarContext";
import RecipeForm from "@/components/RecipeForm";

export default function CreateRecipe() {
  return (
    <SnackbarProvider>
      <RecipeForm />
    </SnackbarProvider>
  );
}
