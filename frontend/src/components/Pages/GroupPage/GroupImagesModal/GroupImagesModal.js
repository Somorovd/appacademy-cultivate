import { useState, useRef, useEffect } from "react";
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
            single={images.length === 1}
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

function ImageCard({ image, addCard, groupId, single }) {
  const dispatch = useDispatch();
  const deleteAction = useRef();
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    document.addEventListener("click", cancelConfirm);
    return () => document.addEventListener("click", cancelConfirm);
  }, []);

  const cancelConfirm = (e) => {
    if (addCard || deleteAction.current?.contains(e.target)) return;
    else setConfirmDelete(false);
  };

  const handleImageUpload = (e) => {
    const files = [];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    for (let file of e.target.files)
      if (allowedTypes.includes(file.type)) files.push(file);
    dispatch(groupActions.thunkBulkAddGroupImages(files, groupId));
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirmDelete) dispatch(groupActions.thunkDeleteGroupImage(image));
    else return setConfirmDelete(true);
  };

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
            {!single && (
              <div
                className="group-image-card__delete"
                onClick={handleDelete}
                ref={deleteAction}
              >
                {confirmDelete ? (
                  <i className="fa-regular fa-trash-can delete"></i>
                ) : (
                  <i className="fa-solid fa-xmark delete"></i>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
