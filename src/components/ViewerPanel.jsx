import React, { useEffect, useRef } from "react";

const ViewerPanel = ({ glbPath, materialConfig, selections }) => {
  const modelRef = useRef(null);

  // Triggered after GLB finishes loading
  const handleModelLoaded = () => {
    const el = modelRef.current;
    if (!el || !el.model) return;

    const mats = el.model.materials;
    if (!mats) return;

    console.log(
      "🔎 Available materials:",
      mats.map((m) => m.name)
    );

    // Build a dictionary lookup { "MaterialName": materialObject }
    el._materialMap = {};
    mats.forEach((mat) => {
      el._materialMap[mat.name] = mat;
    });

    applySelectedMaterials();
  };

  const applySelectedMaterials = () => {
    const el = modelRef.current;
    if (!el || !el._materialMap) return;

    Object.values(materialConfig).forEach((group) => {
      const selectedOptionId = selections[group.id];
      if (!selectedOptionId) return;

      const option = group.options.find((o) => o.id === selectedOptionId);
      if (!option) return;

      const material = el._materialMap[group.materialName];
      if (!material) return;

      const pbr = material.pbrMetallicRoughness;

      // Tint the texture (works reliably in model-viewer)
      if (pbr && pbr.setBaseColorFactor) {
        pbr.setBaseColorFactor(option.colorFactor);
      }
    });
  };

  // Re-apply when user selects new option
  useEffect(() => {
    applySelectedMaterials();
  }, [selections]);

  return (
    <section className="viewer-panel">
      <div className="viewer-wrapper">
        <model-viewer
          ref={(ref) => {
            modelRef.current = ref;
            if (ref) {
              ref.addEventListener("load", handleModelLoaded);
            }
          }}
          src={glbPath}
          camera-controls
          ar
          ar-modes="scene-viewer quick-look webxr"
          environment-image="neutral"
          shadow-intensity="1"
          exposure="1"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="viewer-footer ">
        <button
          className="primary-btn"
          onClick={() =>
            modelRef.current &&
            modelRef.current.activateAR &&
            modelRef.current.activateAR()
          }
        >
          View in AR
        </button>
      </div>
    </section>
  );
};

export default ViewerPanel;
