import Recipe from "@/app/recipes/page";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Recipe {
  id: string;
  name: string;
  email: string;
  title: string;
  description: string;
  ingridients: string;
  instructions: string;
  isFavorite: boolean;
  image: string;
  createdDate: string;
}

interface RecipeState {
  recipes: Recipe[];
  search: string;
}

const initialState: RecipeState = {
  recipes: [],
  search: "",
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    initializeRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      console.log(action.payload);
      state.recipes.push(action.payload);
    },
    updateRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.recipes.findIndex(
        (recipe) => recipe.id === action.payload.id
      );
      if (index !== -1) {
        state.recipes[index] = { ...state.recipes[index], ...action.payload };
      }
    },
    searchRecipe: (state, action: PayloadAction<string>) => {
      state.search = action.payload.toLowerCase();
    },
    toggleFavoriteRecipe: (state, action: PayloadAction<string>) => {
      // Find the index of the given recipe id
      const indexRecipe = state.recipes.findIndex(
        (recipe) => recipe.id === action.payload
      );

      if (indexRecipe !== -1) {
        // Toggle the isFavorite property of the found recipe
        state.recipes[indexRecipe].isFavorite =
          !state.recipes[indexRecipe].isFavorite;
      }
    },
    deleteRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
  },
});

export const {
  initializeRecipes,
  addRecipe,
  updateRecipe,
  searchRecipe,
  toggleFavoriteRecipe,
  deleteRecipe,
} = recipeSlice.actions;

export default recipeSlice.reducer;
