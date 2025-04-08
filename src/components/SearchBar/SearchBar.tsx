"use client";
import React, { ChangeEvent } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  width?: number | string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  width = 300,
}) => {
  return (
    <TextField
      variant="outlined"
      size="small"
      sx={{
        backgroundColor: "white",
        borderRadius: 1,
        width: width,
        marginLeft: 2,
      }}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="start" color="primary" aria-label="search">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
