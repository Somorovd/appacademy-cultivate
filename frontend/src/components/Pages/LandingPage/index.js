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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </p>
            </div>
            <img src="" className="landing-intro__image" />
          </article>
          <article className="landing-about">
            <h2>How to Cultivate</h2>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit
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
                  Find a ritual
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
                  Start a new cult
                </h2>
                <p className="landing-nav-card__about">
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                  consectetur, adipisci velit
                </p>
              </li>
            </ul>
          </article>
          {!session.user &&
            <div className="landing-join">
              <button>
                Join Us
              </button>
            </div>
          }
        </div >
      </div>
    </>
  )
}

export default LandingPage;