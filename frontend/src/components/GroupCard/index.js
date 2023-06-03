

const GroupCard = ({ group }) => {
  return (
    <article className="group-card">
      <img src={group.previewImage} className="group-card__image" />
      <header className="group-card__header">
        <h2 className="group-card__title">
          {group.name}
        </h2>
        <p className="group-card__location">
          {group.city}
        </p>
      </header>
      <p className="group-card__about">
        {group.about}
      </p>
      <footer className="group-card__footer">
        <p>
          {group.numMembers} members
        </p>
        <p>
          {group.private ? "Private" : "Public"}
        </p>
      </footer>
    </article>
  )
}

export default GroupCard;