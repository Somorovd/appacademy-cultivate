import { useSelector } from "react-redux";
import "./GroupImages.css";

export default function GroupImages() {
  const images = useSelector(
    (state) => state.groups.singleGroup["GroupImages"]
  );
  const previewImageUrl = images.find((img) => img.preview)?.url;

  return (
    <div className="group-image-container">
      {images.length > 1 && (
        <div className="image-slider image-slider--left">
          <i className="fa-solid fa-angle-left"></i>
        </div>
      )}
      <img
        src={previewImageUrl}
        className="group-details__image"
        alt="group"
      />
      {images.length > 1 && (
        <div className="image-slider image-slider--right">
          <i className="fa-solid fa-angle-left"></i>
        </div>
      )}
    </div>
  );
}
