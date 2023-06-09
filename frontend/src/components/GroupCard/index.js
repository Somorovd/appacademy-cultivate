import { useHistory } from "react-router-dom";
import "./GroupCard.css";

const GroupCard = ({ group }) => {
  const history = useHistory();

  const onClick = () => {
    history.push(`/groups/${group.id}`);
  }

  return (
    <article
      className="group-card"
      onClick={onClick}
    >
      <div className="group-card__image">
        <img src={group.previewImage} />
      </div>
      <header className="group-card__header">
        <h2 className="group-card__title">
          {group.name}
        </h2>
        <p className="group-card__location">
          {group.city}, {group.state}
        </p>
      </header>
      <p className="group-card__about">
        {group.about}
      </p>
      <footer className="group-card__footer">
        <p>
          <span className="group-card__members">
            {group.numMembers}
          </span>
          &nbsp;Members
        </p>
        <p>&bull;</p>
        <p className="group-card__privacy">
          {group.private ? "Private" : "Public"}
        </p>
      </footer>
    </article>
  )
}

export default GroupCard;