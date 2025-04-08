/* eslint-disable @next/next/no-img-element */
"use client";
import { useSnackbar } from "@/app/context/SnackbarContext";
import {
  addRecipe,
  Recipe,
  updateRecipe,
} from "@/app/lib/features/recipes/recipesSlice";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

interface RecipeFormProps {
  recipe?: Recipe;
  onDeleteRecipe?: (id: string) => void;
}

interface IFormInput {
  name: string;
  email: string;
  title: string;
  description: string;
  ingridients: string;
  instructions: string;
  image: FileList;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ recipe, onDeleteRecipe }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<IFormInput>({
    mode: "onChange",
    defaultValues: {
      name: recipe?.name || "",
      email: recipe?.email || "",
      title: recipe?.title || "",
      description: recipe?.description || "",
      ingridients: recipe?.ingridients || "",
      instructions: recipe?.instructions || "",
    },
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Handle the form submit
  const handleSubmitForm = async (data: IFormInput) => {
    const isEditMode = !!recipe; // Check if form is in edit mode
    const isNewImage = imageFileWatch?.[0] instanceof File; // Check if new uploaded image
    let imagePath = recipe?.image || "";

    const formData = new FormData();
    formData.append("image", data.image[0]);

    if (isNewImage) {
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          imagePath = result.filePath;
        } else {
          enqueueSnackbar(result.message, { severity: "error" });
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        enqueueSnackbar(error.message, { severity: "error" });
        return;
      }
    }

    const { description, email, ingridients, instructions, name, title } = data;

    // Build recipe payload
    const recipePayload: Recipe = {
      ...(recipe || {
        id: uuidv4(),
        createdDate: new Date().toLocaleDateString(),
        isFavorite: false,
      }),
      title,
      description,
      email,
      ingridients,
      instructions,
      name,
      image: imagePath,
    };

    if (isEditMode) {
      dispatch(updateRecipe(recipePayload));
      enqueueSnackbar("Recipe updated successfully!", { severity: "success" });
    } else {
      dispatch(addRecipe(recipePayload));
      enqueueSnackbar("New recipe successfully created!", {
        severity: "success",
      });
      reset();
    }
  };

  // Watch for image selection
  const imageFileWatch = useWatch({
    control,
    name: "image",
  });

  useEffect(() => {
    const imageFile = imageFileWatch?.[0];

    if (!imageFile) {
      setImagePreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string); // set image preview
    };
    reader.readAsDataURL(imageFile);
  }, [imageFileWatch]);

  const handleClickBack = () => router.push("/recipes"); // Navigate to '/recipes' page

  // Get the preview image or placeholder
  const getImagePreview = () => {
    if (!mounted) return "/images/img_placeholder.png";

    if (imagePreview) return imagePreview;

    // If editing and no new image selected, show existing image
    return recipe?.image || "/images/img_placeholder.png";
  };

  return (
    <Box component="div">
      <Grid container spacing={4}>
        <Grid size={{ xs: 6, md: 4 }}>
          {/* Back button */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              mb: "32px",
              "&:hover": { cursor: "pointer" },
            }}
            onClick={handleClickBack}
          >
            <KeyboardArrowLeft sx={{ marginRight: "8px" }} /> Back
          </Typography>

          {/* Image preview */}
          <Box
            component="div"
            sx={{
              border: !!errors.image ? "1px solid red" : "1px solid black",
              padding: "2px",
              "&:hover": { cursor: "pointer" },
            }}
            // Trigger input file
            onClick={() => document.getElementById("image-input")?.click()}
          >
            <img
              src={getImagePreview()}
              alt=""
              style={{
                width: "100%",
                maxHeight: "400px",
              }}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 6, md: 8 }}>
          <Box component="div">
            <form autoComplete="off" onSubmit={handleSubmit(handleSubmitForm)}>
              {/* Image input - hidden */}
              <input
                id="image-input"
                type="file"
                accept="image/*"
                {...register("image", { required: !recipe ? true : false })}
                style={{ marginBottom: "1rem", display: "none" }}
              />
              {/* Name input field */}
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <Box component="div" sx={{ mb: "16px" }}>
                    <Typography sx={{ textTransform: "uppercase" }}>
                      Your Name
                    </Typography>
                    <TextField
                      {...field}
                      placeholder="Enter Name"
                      fullWidth
                      error={!!errors.name}
                      size="small"
                    />
                  </Box>
                )}
              />
              {/* Email address input field */}
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Regular expression for email format
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <Box component="div" sx={{ mb: "16px" }}>
                    <Typography sx={{ textTransform: "uppercase" }}>
                      Email Address
                    </Typography>
                    <TextField
                      {...field}
                      placeholder="Enter Email Address"
                      fullWidth
                      error={!!errors.email}
                      size="small"
                    />
                  </Box>
                )}
              />
              {/* Title input field */}
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <Box component="div" sx={{ mb: "16px" }}>
                    <Typography sx={{ textTransform: "uppercase" }}>
                      Title
                    </Typography>
                    <TextField
                      {...field}
                      placeholder="Enter Title"
                      fullWidth
                      error={!!errors.title}
                      size="small"
                      disabled={!!recipe}
                    />
                  </Box>
                )}
              />
              {/* Description input field */}
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <Box component="div" sx={{ mb: "16px" }}>
                    <Typography sx={{ textTransform: "uppercase" }}>
                      Description
                    </Typography>
                    <TextField
                      {...field}
                      placeholder="Enter Description"
                      fullWidth
                      error={!!errors.description}
                      size="small"
                      multiline
                      rows={2}
                    />
                  </Box>
                )}
              />
              {/* Ingridients input field */}
              <Controller
                name="ingridients"
                control={control}
                rules={{ required: "Ingridients is required" }}
                render={({ field }) => (
                  <Box component="div" sx={{ mb: "16px" }}>
                    <Typography sx={{ textTransform: "uppercase" }}>
                      Ingridients
                    </Typography>
                    <TextField
                      {...field}
                      placeholder="Enter Ingridients"
                      fullWidth
                      error={!!errors.ingridients}
                      size="small"
                      multiline
                      rows={4}
                    />
                  </Box>
                )}
              />
              {/* Instructions input field */}
              <Controller
                name="instructions"
                control={control}
                rules={{ required: "Instructions is required" }}
                render={({ field }) => (
                  <Box component="div" sx={{ mb: "16px" }}>
                    <Typography sx={{ textTransform: "uppercase" }}>
                      Instructions
                    </Typography>
                    <TextField
                      {...field}
                      placeholder="Enter Instructions"
                      fullWidth
                      error={!!errors.instructions}
                      size="small"
                      multiline
                      rows={4}
                    />
                  </Box>
                )}
              />
              {/* Submit button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 2,
                  gap: 1,
                }}
              >
                {recipe && (
                  <Button
                    type="button"
                    variant="contained"
                    color="warning"
                    sx={{ textTransform: "capitalize" }}
                    onClick={() => onDeleteRecipe && onDeleteRecipe(recipe?.id)}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {recipe ? "Update" : "Save"}
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecipeForm;
