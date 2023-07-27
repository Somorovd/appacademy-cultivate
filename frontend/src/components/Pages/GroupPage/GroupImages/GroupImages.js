import { useState } from "react";
import { useSelector } from "react-redux";
import "./GroupImages.css";

export default function GroupImages() {
  const images = useSelector(
    (state) => state.groups.singleGroup["GroupImages"]
  );
  const previewImage = images.find((img) => img.preview);
  const index = images.indexOf(previewImage);

  const [imageIndex, setImageIndex] = useState(Math.max(index, 0));

  return (
    <div className="group-image-container">
      {images.length > 1 && (
        <div
          className="image-slider image-slider--left"
          onClick={() =>
            setImageIndex((i) => (i - 1 + images.length) % images.length)
          }
        >
          <i className="fa-solid fa-angle-left"></i>
        </div>
      )}
      <img
        src={images[imageIndex].url}
        className="group-details__image"
        alt="group"
      />
      {images.length > 1 && (
        <div
          className="image-slider image-slider--right"
          onClick={() => setImageIndex((i) => (i + 1) % images.length)}
        >
          <i className="fa-solid fa-angle-left"></i>
        </div>
      )}
    </div>
  );
}
