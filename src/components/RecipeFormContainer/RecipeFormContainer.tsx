"use client";
import { deleteRecipe, Recipe } from "@/app/lib/features/recipes/recipesSlice";
import React from "react";
import RecipeForm from "../RecipeForm/RecipeForm";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSnackbar } from "@/app/context/SnackbarContext";
interface RecipeFormContainerProps {
  recipe?: Recipe;
}
const RecipeFormContainer: React.FC<RecipeFormContainerProps> = ({
  recipe,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDeleteRecipe = (id: string) => {
    dispatch(deleteRecipe(id)); // Delete recipe
    enqueueSnackbar(`Recipe ${recipe?.title} successfully delete!`, {
      severity: "error",
    });
    router.push("/recipes"); // Navigate to '/recipes' page
  };
  return (
    <>
      {recipe ? (
        <RecipeForm recipe={recipe} onDeleteRecipe={handleDeleteRecipe} />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          <Typography variant="h5" color="textSecondary">
            No record found!
          </Typography>
        </Box>
      )}
    </>
  );
};

export default RecipeFormContainer;
