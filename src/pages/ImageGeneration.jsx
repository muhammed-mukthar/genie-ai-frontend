import React, { useState } from "react";

import ImageSection from "../components/ImageSection";

const ImageGeneration = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <ImageSection
        title="Image generation"
        placeholder="Add your text"
        altText="generate image"
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};

export default ImageGeneration;
