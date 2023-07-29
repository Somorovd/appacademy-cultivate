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

  return (
    <div className="group-image-card">
      <img
        src={image.url}
        alt=""
      />
      <div className="group-image-card__actions">
        {!image.preview && (
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
    </div>
  );
}
