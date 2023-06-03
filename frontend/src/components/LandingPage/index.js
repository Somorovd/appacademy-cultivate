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
      <div className="landing-wrapper">
        <article className="landing-intro">
          <div className="landing-intro__text">
            <h1 className="landing-intro__title">
              Welcome to this incredible ... uh ... yeah
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
              aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
          <img src="" className="landing-intro__image" />
        </article>
        <article className="landing-about">
          <h2>How $#*! works</h2>
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
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
                See all groups
              </h2>
              <p className="landing-nav-card__about">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit
              </p>
            </li>
            <li className="landing-nav-card">
              <img src="" alt="" className="landing-nav-card__image" />
              <h2
                className="landing-nav-card__title"
                onClick={() => { history.push("/events") }}
              >
                Find an event
              </h2>
              <p className="landing-nav-card__about">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit
              </p>
            </li>
            <li className="landing-nav-card">
              <img src="" alt="" className="landing-nav-card__image" />
              <h2
                className={startGroupClassName}
                onClick={() => { history.push("/groups/new") }}
              >
                Start a new group
              </h2>
              <p className="landing-nav-card__about">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit
              </p>
            </li>
          </ul>
        </article>
        <div className="landing-join">
          <button>
            Join Us
          </button>
        </div>
      </div >
    </>
  )
}

export default LandingPage;