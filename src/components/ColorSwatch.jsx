const ColorSwatch = ({ option, selected, onSelect }) => {
  const isTexture = !!option.thumbnail; // detect if product uses texture swatch

  return (
    <button
      className={`swatch ${selected ? "swatch--selected" : ""}`}
      onClick={() => onSelect(option)}
    >
      {isTexture ? (
        <img
          className="swatch-img"
          src={option.thumbnail}
          alt={option.label}
          width="100px"
        />
      ) : (
        <span
          className="swatch-color"
          style={{ backgroundColor: option.swatchHex }}
        />
      )}
    </button>
  );
};

export default ColorSwatch;
