"use client";
import React, { useMemo, useState } from "react";
import SortDropdown from "../../components/SortDropdown";
import FilterCheckbox from "../../components/FilterCheckbox";
import RecipeCard from "../../components/RecipeCard";
import { Box, Grid, Typography } from "@mui/material";
import AddButton from "../../components/AddButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { useRouter } from "next/navigation";
import { SortOrder } from "@/components/SortDropdown/SortDropdown";
import { Favorite } from "@/components/FilterCheckbox/FilterCheckbox";
import { toggleFavoriteRecipe } from "../lib/features/recipes/recipesSlice";
import { SnackbarProvider } from "../context/SnackbarContext";

export default function Recipe() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { recipes, search } = useSelector((state: RootState) => state.recipes);
  const [sortOrder, setSortOrder] = useState<SortOrder>("");
  const [filterType, setFilterType] = useState<Favorite>({
    yes: false,
    no: false,
  });

  const recipeList = useMemo(() => {
    let filteredRecipes = [...recipes]; // clone recipes data

    // Filter recipes
    if (filterType.yes && !filterType.no) {
      // Filtered by isFavorite equal to true
      filteredRecipes = filteredRecipes.filter(
        (val) => val.isFavorite === true
      );
    } else if (filterType.no && !filterType.yes) {
      // Filtered by isFavorite equal to false
      filteredRecipes = filteredRecipes.filter(
        (val) => val.isFavorite === false
      );
    }

    // Sort recipes
    if (sortOrder) {
      // Sort by order type
      filteredRecipes.sort(
        (a, b) =>
          sortOrder === "ASC"
            ? a.title.localeCompare(b.title) // sort by asceding order
            : b.title.localeCompare(a.title) // sort by desceding order
      );
    }

    // Search
    if (search) {
      // Search item by title
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(search)
      );
    }

    return filteredRecipes;
  }, [recipes, sortOrder, filterType, search]);

  const handleSortOnChange = (sortType: SortOrder) => {
    setSortOrder(sortType); // Set the sort type order
  };

  const handleFilterChange = (favoriteVal: Favorite) => {
    setFilterType(favoriteVal); // Set is favorite values
  };

  const handleAddFavorite = (recipeId: string) => {
    dispatch(toggleFavoriteRecipe(recipeId)); // Add favorite recipe
  };

  const handleClickAdd = () => router.push("/recipes/create"); // Navigate to create recipe form

  const handleClickSeeMore = (id: string) => {
    router.push(`/recipes/${id}/edit`);
  };

  console.log("list: ", search);
  return (
    <>
      <SnackbarProvider>
        <Grid container spacing={4}>
          <Grid size={4}>
            {/* Dropdown sort */}
            <SortDropdown value={sortOrder} onChange={handleSortOnChange} />

            {/* Filter checkbox */}
            <FilterCheckbox
              label="Favorites?"
              selectedValues={filterType}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid size={8}>
            <Box
              component="div"
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                p: 4,
                height: "80vh",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {/* Add recipe button */}
              <AddButton onClick={handleClickAdd} />

              {recipeList.length === 0 ? (
                // No available record
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
                    No records found!
                  </Typography>
                </Box>
              ) : (
                // Recipe card list
                recipeList.map((recipe) => (
                  <RecipeCard
                    id={recipe.id}
                    addedBy={recipe.name}
                    date={recipe.createdDate}
                    description={recipe.description}
                    image={recipe.image}
                    title={recipe.title}
                    isFavorite={recipe.isFavorite}
                    key={recipe.id}
                    addFavorite={handleAddFavorite}
                    clickSeeMore={handleClickSeeMore}
                  />
                ))
              )}
            </Box>
          </Grid>
        </Grid>
      </SnackbarProvider>
    </>
  );
}
