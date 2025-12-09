import React, { useState } from "react";
import OptionPanel from "./OptionPanel";
import ViewerPanel from "./ViewerPanel";
import { MATERIAL_OPTIONS } from "../components/materialOptions";

const defaultSelections = {
  topFinish: MATERIAL_OPTIONS.woodFinish.options[0].id,
};

const Configurator = () => {
  const [selections, setSelections] = useState(defaultSelections);

  const handleChangeSelection = (groupId, optionId) => {
    setSelections((prev) => ({
      ...prev,
      [groupId]: optionId,
    }));
  };

  return (
    <div className="configurator-layout">
      <ViewerPanel
        glbPath="/models/table.glb" // <- put your GLB here
        materialConfig={MATERIAL_OPTIONS}
        selections={selections}
      />
      <OptionPanel
        selections={selections}
        onChangeSelection={handleChangeSelection}
      />
    </div>
  );
};

export default Configurator;
