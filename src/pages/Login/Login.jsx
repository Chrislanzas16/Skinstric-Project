import React, { useState } from "react";
import "./Login.css";
import back_btn from "../../assets/images/buttin-icon-shrunk (1).svg";
import right_btn from "../../assets/images/buttin-icon-shrunk.svg";
import { Link } from "react-router-dom";

const Login = () => {
  const [step, setStep] = useState("username");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === "username") {
      localStorage.setItem("username", username);
      setStep("city");
      return;
    }
    setLoading(true);
    try {
      localStorage.setItem("city", city);
      await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, city }),
        }
      );
      setDone(true);
    } catch (err) {
      console.log("ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="sub-header">TO START ANALYSIS</div>
      <div className="login">
        <div className="spin-stack" aria-hidden="true">
          <div className="diamond d1"></div>
          <div className="diamond d2"></div>
          <div className="diamond d3"></div>
        </div>
        <div className="form-wrapper">
          {loading ? (
            <div className="status">
              <h2 className="status-title">Processing submission</h2>
              <div className="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : done ? (
            <>
              <div className="status success">
                <h2 className="status-title">Thank you!</h2>
                <p className="status-sub">Proceed for the next step.</p>
              </div>
            </>
          ) : (
            <>
              <p>CLICK TO TYPE</p>
              <form onSubmit={handleSubmit} className="form-content">
                {step === "username" ? (
                  <input
                    type="text"
                    placeholder="Introduce Yourself"
                    name="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="your city name"
                    name="city"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-input"
                  />
                )}
              </form>
            </>
          )}
        </div>
      </div>

      {done && (
        <div className="proceed-btn">
          <Link to="/analyze">
            <button className="proceed-button">
              PROCEED
              <img className="btn-img" src={right_btn} alt="" />
            </button>
          </Link>
        </div>
      )}

      <div className="back-btn">
        <Link to="/">
          <button className="back-button">
            <img className="btn-img" src={back_btn} alt="" />
            BACK
          </button>
        </Link>
      </div>
    </>
  );
};

export default Login;
