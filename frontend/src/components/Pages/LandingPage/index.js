import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import SignupFormModal from "../../SignupFormModal";
import "./LandingPage.css";

const LandingPage = () => {
  const history = useHistory();
  const session = useSelector((state) => state.session);

  const startGroupClassName = "landing-nav-card__title " + (
    session && session.user ? "" : "disabled-link"
  );

  return (
    <>
      <div className="page-wrapper">
        <div className="landing-page">
          <article className="landing-intro">
            <div className="landing-intro__text">
              <h1 className="landing-intro__title">
                The cultist platform 	&mdash; Where prayers become nightmares
              </h1>
              <p className="landing-intro__p">
                Embrace the darkness. Join a congregation of devoted believers
                and explore a world of horrors, where every moment unravels
                into an abyss of chilling experiences.
              </p>
            </div>
            <img
              src="https://cdn.discordapp.com/attachments/723759214123679836/1117661691019264120/flowers.png"
              className="landing-intro__image" />
          </article>
          <article className="landing-about">
            <h2>How to Cultivate</h2>
            <p>
              Become a charasmatic leader or a clueless follower and
              perform hallowed rituals for our ancient masters.
              Accounts are free so join us now!
            </p>
          </article>
          <article className="landing-nav">
            <ul className="landing-nav-list">
              < li className="landing-nav-card">
                <img
                  src="https://images.vexels.com/media/users/3/242393/isolated/lists/5448e03ce4b979fa216c768944761ce2-tarot-card-the-fool-filled-stroke.png"
                  alt=""
                  className="landing-nav-card__image"
                />
                <h2
                  className="landing-nav-card__title"
                  onClick={() => { history.push("/groups") }}
                >
                  See all cults
                </h2>
                <p className="landing-nav-card__about">
                  Answer the Call. Discover a community that shares your deepest
                  fears. This is your life now.
                </p>
              </li>
              <li className="landing-nav-card">
                <img
                  src="https://images.vexels.com/media/users/3/242414/isolated/lists/a8e4a045e4de4ebad12d0af432f03817-tarot-card-the-wheel-filled-stroke.png"
                  alt=""
                  className="landing-nav-card__image"
                />
                <h2
                  className="landing-nav-card__title"
                  onClick={() => { history.push("/events") }}
                >
                  Find a ritual
                </h2>
                <p className="landing-nav-card__about">
                  Perform rituals among leaders and followers alike.
                  You may even become the central attraction!
                </p>
              </li>
              <li className="landing-nav-card">
                <img
                  src="https://images.vexels.com/media/users/3/242394/isolated/lists/a5833ac6dc2e1bdfe54d9f8b20f95b43-tarot-card-the-emperor-stroke.png"
                  alt=""
                  className="landing-nav-card__image" />
                <h2
                  className={startGroupClassName}
                  onClick={() => { history.push("/groups/new") }}
                >
                  Start a new cult
                </h2>
                <p className="landing-nav-card__about">
                  Have you heard the whiphers yourself? Its time to rise up!
                  Let everyone know theres a new player in town.
                </p>
              </li>
            </ul>
          </article>
          {!session.user &&
            <div className="landing-join">
              <OpenModalButton
                buttonText="Join Us"
                modalComponent={<SignupFormModal />}
                buttonClasses="round blue"
              />
            </div>
          }
        </div >
      </div>
    </>
  )
}

export default LandingPage;