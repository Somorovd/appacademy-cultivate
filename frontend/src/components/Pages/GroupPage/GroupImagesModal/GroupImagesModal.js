import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as groupActions from "../../../../store/groups";
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
        <ImageCard
          addCard={true}
          groupId={group.id}
        />
      </section>
    </div>
  );
}

function ImageCard({ image, addCard, groupId }) {
  const dispatch = useDispatch();
  const [imageFiles, setImageFiles] = useState([]);

  const updateFiles = (e) => {
    const files = e.target.files;
    setImageFiles(files);
  };

  const handleImageUpload = (e) => {
    updateFiles(e);
    dispatch(groupActions.thunkBulkAddGroupImages(e.target.files, groupId));
  };

  const handleDelete = () => {};

  return (
    <div className="group-image-card">
      {addCard ? (
        <>
          <label htmlFor="group-image-input">
            <i className="add-image fa-solid fa-circle-plus blue"></i>
          </label>
          <input
            id="group-image-input"
            type="file"
            multiple
            accept=".jpg, .jpeg, .png"
            onChange={handleImageUpload}
          />
        </>
      ) : (
        <>
          <img
            src={image.url}
            alt=""
          />
          <div className="group-image-card__actions">
            <i
              className="fa-regular fa-trash-can delete"
              onClick={handleDelete}
            ></i>
          </div>
        </>
      )}
    </div>
  );
}
