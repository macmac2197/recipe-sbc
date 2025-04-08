"use client";
import React, { useRef, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import SearchBar from "../SearchBar";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { searchRecipe } from "@/app/lib/features/recipes/recipesSlice";
import { debounce } from "lodash";

const Header: React.FC = () => {
  const pathName = usePathname();
  const dispatch = useDispatch();
  const showSearch = pathName === "/recipes"; // Show only when in recipe list page
  const [searchQuery, setSearchQuery] = useState<string>("");

  // debounce search
  const debounceSearch = useRef(
    debounce((searchStr: string) => {
      dispatch(searchRecipe(searchStr)); // sumbit search query
    }, 1000)
  );

  // Handle input change search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchVal = e.target.value;
    setSearchQuery(searchVal);
    debounceSearch.current(searchVal);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#5469b4" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Recipe App
        </Typography>
        {showSearch && (
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search here..."
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
