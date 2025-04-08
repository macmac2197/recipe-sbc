"use client";
import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

interface AddButtonProps {
  onClick?: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        right: "100px",
        backgroundColor: "#5469b4",
        color: "white",
        borderRadius: "50%",
        padding: "12px",
        "&:hover": {
          backgroundColor: "#5469b4",
        },
      }}
    >
      <Add fontSize="large" />
    </IconButton>
  );
};

export default AddButton;
