import React from "react";

const ColorSwatch = ({ option, selected, onSelect }) => {
  return (
    <button
      className={`swatch ${selected ? "swatch--selected" : ""}`}
      onClick={() => onSelect(option)}
    >
      <span
        className="swatch-color"
        style={{ backgroundColor: option.swatchHex }}
      />
      <span className="swatch-label">{option.label}</span>
    </button>
  );
};

export default ColorSwatch;
