"use client";
import React from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

export interface Favorite {
  yes: boolean;
  no: boolean;
}

export interface FilterCheckboxProps {
  label: string;
  selectedValues: Favorite;
  onChange: (values: Favorite) => void;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  label,
  selectedValues,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...selectedValues,
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <Box component="div" sx={{ mb: "32px" }}>
      <Typography variant="h6" gutterBottom>
        Filter
      </Typography>
      <Box
        component="div"
        sx={{ p: 2, border: "1px solid black", borderRadius: "4px" }}
      >
        <Typography variant="subtitle1">{label}</Typography>
        <FormControl component="fieldset">
          <FormGroup sx={{ ml: "16px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedValues.yes}
                  onChange={handleChange}
                  name="yes"
                />
              }
              label="Yes"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedValues.no}
                  onChange={handleChange}
                  name="no"
                />
              }
              label="No"
            />
          </FormGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default FilterCheckbox;
