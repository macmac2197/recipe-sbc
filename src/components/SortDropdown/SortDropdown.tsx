"use client";
import React from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

export type SortOrder = "ASC" | "DESC" | "";

interface SortDropdownProps {
  value: SortOrder;
  onChange: (order: SortOrder) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as SortOrder);
  };

  return (
    <Box component="div" sx={{ mb: "32px" }}>
      <Typography variant="h6" gutterBottom>
        Sort by title
      </Typography>
      <FormControl fullWidth size="small">
        <Select value={value} onChange={handleChange}>
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="ASC">ASC</MenuItem>
          <MenuItem value="DESC">DESC</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortDropdown;
