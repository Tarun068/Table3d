import React, { useState } from "react";
import OptionPanel from "./OptionPanel";
import ViewerPanel from "./ViewerPanel";
import { PRODUCTS } from "../config/productList";
import { MATERIAL_OPTIONS } from "../components/materialOptions";

const Configurator = () => {
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id);

  const product = PRODUCTS.find((p) => p.id === selectedProductId);
  const materialConfig = MATERIAL_OPTIONS[product.materialOptionsKey];

  // prevent crash if mapping is wrong
  const buildDefaultSelections = () => {
    if (!materialConfig) return {};
    let result = {};
    Object.entries(materialConfig).forEach(([groupId, group]) => {
      result[groupId] = group.options[0].id;
    });
    return result;
  };

  const [selections, setSelections] = useState(buildDefaultSelections());

  const handleProductChange = (newProductId) => {
    setSelectedProductId(newProductId);

    const newProduct = PRODUCTS.find((p) => p.id === newProductId);
    const newMaterialConfig = MATERIAL_OPTIONS[newProduct.materialOptionsKey];

    let resetSelections = {};
    Object.entries(newMaterialConfig).forEach(([groupId, group]) => {
      resetSelections[groupId] = group.options[0].id;
    });
    setSelections(resetSelections);
  };

  const handleChangeSelection = (groupId, optionId) => {
    setSelections((prev) => ({
      ...prev,
      [groupId]: optionId,
    }));
  };

  // if config missing - show message
  if (!materialConfig) {
    return (
      <div style={{ color: "red" }}>
        ❌ materialOptionsKey mismatch in productList.js
      </div>
    );
  }

  return (
    <div className="configurator-layout">
      <ViewerPanel
        glbPath={product.model}
        materialConfig={materialConfig}
        selections={selections}
      />
      <div className="group">
        <div className="product-selector">
          <select
            value={selectedProductId}
            onChange={(e) => handleProductChange(e.target.value)}
          >
            {PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <OptionPanel
          selections={selections}
          onChangeSelection={handleChangeSelection}
          materialConfig={materialConfig}
        />
      </div>
    </div>
  );
};

export default Configurator;
