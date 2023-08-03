import { useDispatch } from "react-redux";
import * as groupActions from "../../../../store/groups";

export default function NewImageCard({ groupId }) {
  const dispatch = useDispatch();

  const handleImageUpload = (e) => {
    const files = [];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    for (let file of e.target.files)
      if (allowedTypes.includes(file.type)) files.push(file);
    dispatch(groupActions.thunkBulkAddGroupImages(files, groupId));
  };

  return (
    <div className="group-image-card">
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
    </div>
  );
}
