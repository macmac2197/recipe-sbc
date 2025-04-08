"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface RecipeCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  addedBy: string;
  isFavorite?: boolean;
  date: string;
  addFavorite: (id: string) => void;
  clickSeeMore: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = (recipe) => {
  const {
    id,
    title,
    description,
    addedBy,
    date,
    isFavorite,
    image,
    addFavorite,
    clickSeeMore,
  } = recipe;

  // handle click add favorite
  const handleClickFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addFavorite(id);
  };

  return (
    <React.Fragment>
      <Card
        sx={{
          display: "flex",
          borderRadius: 3,
          boxShadow: 3,
          width: "100%",
          border: "1px solid black",
          mb: "16px",
          mt: "16px",
        }}
      >
        <Box sx={{ position: "relative" }}>
          {/* Image display */}
          <CardMedia
            component="img"
            sx={{ width: 310, height: "100%", borderRadius: 3 }}
            image={image}
            alt={title}
          />
          {/* Favorite icon */}
          <IconButton
            onClick={handleClickFavorite}
            aria-label="favorite"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            {isFavorite ? (
              <StarIcon sx={{ color: "gold" }} />
            ) : (
              <StarBorderIcon sx={{ color: "gold" }} />
            )}
          </IconButton>
        </Box>

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          {/* Card title */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ textTransform: "capitalize" }}
          >
            {title}
          </Typography>
          {/* Card description */}
          <Typography variant="body1" sx={{ mt: 1, mb: 1, fontWeight: "bold" }}>
            {description.length > 250
              ? `${description.substring(0, 250)}...`
              : description}
          </Typography>
          <Typography
            variant="caption"
            fontWeight="bold"
            onClick={() => clickSeeMore(id)}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: "blue",
              },
            }}
          >
            See more
          </Typography>
          <Box component="div">
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              Added by: {addedBy}
            </Typography>
            <Typography
              variant="caption"
              sx={{ float: "right", fontWeight: "bold" }}
            >
              Date: {date}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Divider variant="fullWidth" />
    </React.Fragment>
  );
};

export default RecipeCard;
