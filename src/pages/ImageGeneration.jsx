import React, { useState } from "react";

import ImageSection from "../components/ImageSection";

const ImageGeneration = () => {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  return (
    <>
      <ImageSection
        apiEndpoint="http://localhost:8080/api/v1/openai/lofi-image"
        title="Lo-fi Image"
        placeholder="Add your text"
        altText="lofiImage"
        loading={loading1}
        setLoading={setLoading1}
      />

      <ImageSection
        apiEndpoint="http://localhost:8080/api/v1/openai/anime-image"
        title="Anime Image"
        placeholder="Add your text"
        altText="animeImage"
        loading={loading}
        setLoading={setLoading}
      />

      <ImageSection
        apiEndpoint="http://localhost:8080/api/v1/openai/scifi-image"
        title="Scifi Image"
        placeholder="Add your text"
        altText="scifiImage"
        loading={loading2}
        setLoading={setLoading2}
      />
    </>
  );
};

export default ImageGeneration;
