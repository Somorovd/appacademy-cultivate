import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
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
            <img src="" className="landing-intro__image" />
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
                <img src="" alt="" className="landing-nav-card__image" />
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
                <img src="" alt="" className="landing-nav-card__image" />
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
                <img src="" alt="" className="landing-nav-card__image" />
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
              <button className="skew">
                <span>
                  Join Us
                </span>
              </button>
            </div>
          }
        </div >
      </div>
    </>
  )
}

export default LandingPage;