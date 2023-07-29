import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import * as groupActions from "../../../../store/groups";

export default function ImageCard({ image }) {
  const dispatch = useDispatch();
  const deleteAction = useRef();
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    document.addEventListener("click", cancelConfirm);
    return () => document.addEventListener("click", cancelConfirm);
  }, []);

  const cancelConfirm = (e) => {
    if (deleteAction.current?.contains(e.target)) return;
    else setConfirmDelete(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirmDelete) dispatch(groupActions.thunkDeleteGroupImage(image));
    else return setConfirmDelete(true);
  };

  const handleChangePreview = () => {
    dispatch(groupActions.thunkSetPreviewImage(image.id));
  };

  return (
    <div className="group-image-card">
      <img
        src={image.url}
        alt=""
      />
      <div className="group-image-card__actions">
        <div
          className="group-image-card__preview"
          onClick={handleChangePreview}
        >
          <i class={"fa-solid fa-star " + (image.preview && "preview")}></i>
        </div>
        {!image.preview && (
          <div
            className="group-image-card__delete"
            onClick={handleDelete}
            ref={deleteAction}
          >
            {confirmDelete ? (
              <i className="fa-regular fa-trash-can"></i>
            ) : (
              <i className="fa-solid fa-xmark"></i>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
