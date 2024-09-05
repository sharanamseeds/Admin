import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";


const DropDrown = ({ icon, onSelect, name, options }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value) => {
    handleClose();
    onSelect(name, value);
  };

  return (
    <div style={{ position: "relative" }}>
      <IconButton onClick={handleClick}>{icon}</IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options?.map((option, optionIndex) => (
          <MenuItem
            key={optionIndex}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropDrown;
