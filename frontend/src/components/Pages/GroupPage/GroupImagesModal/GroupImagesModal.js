import { useSelector } from "react-redux";

import ImageCard from "./ImageCard";
import NewImageCard from "./NewImageCard";
import "./GroupImagesModal.css";

export default function GroupImagesModal() {
  const group = useSelector((state) => state.groups.singleGroup);
  const images = useSelector(
    (state) => state.groups.singleGroup["GroupImages"]
  );

  return (
    <div className="group-images-modal">
      <h1> {group.name} Images </h1>
      <section className="group-image-grid">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
          />
        ))}
        <NewImageCard groupId={group.id} />
      </section>
    </div>
  );
}
