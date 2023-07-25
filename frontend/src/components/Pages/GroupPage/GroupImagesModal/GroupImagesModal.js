import { useSelector } from "react-redux";
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
        <ImageCard addCard={true} />
      </section>
    </div>
  );
}

function ImageCard({ image, addCard }) {
  const handleImageUpload = () => {
    alert("add new image(s)");
  };

  return (
    <div className="group-image-card">
      {addCard ? (
        <i
          className="add-image fa-solid fa-circle-plus blue"
          onClick={handleImageUpload}
        ></i>
      ) : (
        <img
          src={image.url}
          alt=""
        />
      )}
    </div>
  );
}
