import ColorSwatch from "./ColorSwatch";

const OptionPanel = ({ selections, onChangeSelection, materialConfig }) => {
  return (
    <aside className="option-panel">
      <div className="option-panel-header">
        <h1 className="product-title">10500 Series Mobile Pedestal</h1>
        <p className="product-subtitle">SKU: H105102</p>
      </div>

      <div className="option-groups">
        {Object.values(materialConfig).map((group) => (
          <div key={group.id} className="option-group">
            <div className="option-group-title">{group.title}</div>
            <div className="option-group-swatches">
              {group.options.map((opt) => (
                <ColorSwatch
                  key={opt.id}
                  option={opt}
                  selected={selections[group.id] === opt.id}
                  onSelect={(selectedOpt) =>
                    onChangeSelection(group.id, selectedOpt.id)
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="summary-box">
        <div className="summary-row">
          <span>List Price</span>
          <span>$999.00</span>
        </div>
        <div className="summary-row">
          <span>Net Price</span>
          <span>$749.00</span>
        </div>
        <div className="summary-row">
          <span>Lead Time</span>
          <span>3–4 weeks</span>
        </div>
        <button className="primary-btn">Add to Quote</button>
      </div>
    </aside>
  );
};

export default OptionPanel;
