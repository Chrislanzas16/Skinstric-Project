import React, { useMemo, useState } from "react";
import "./Demographics.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import back_btn from "../../assets/images/buttin-icon-shrunk (1).svg";
import right_btn from "../../assets/images/buttin-icon-shrunk.svg";
import Stats from "../../components/StatList/Stats";
import Donut from "../../components/Donut/Donut";

const Demographics = () => {
  const [selected, setSelected] = useState({
    race: null,
    age: null,
    sex: null,
  });
  const [active, setActive] = useState("race");
  const { state } = useLocation();
  const navigate = useNavigate();
  const data =
    state?.demographics || JSON.parse(sessionStorage.getItem("demographics"));

  if (!data) {
    navigate("/analyze");
    return null;
  }

  const toItems = (obj) =>
    Object.entries(obj)
      .map(([name, v]) => ({ name, percent: Number((v * 100).toFixed(2)) }))
      .sort((a, b) => b.percent - a.percent);

  const raceItems = toItems(data.race);
  const ageItems = toItems(data.age);
  const sexItems = toItems(data.gender);

  const idOfMax = (arr = []) =>
    arr.length
      ? arr.reduce(
          (best, x, i, a) => (x.percent > a[best].percent ? i : best),
          0
        )
      : 0;

  const selectedIdx = (section) => {
    if (section === "race") return selected.race ?? idOfMax(raceItems);
    if (section === "age") return selected.age ?? idOfMax(ageItems);
    return selected.sex ?? idOfMax(sexItems);
  };

  const current = useMemo(() => {
    if (active === "age") return { key: "age", title: "Age", items: ageItems };
    if (active === "sex") return { key: "sex", title: "Sex", items: sexItems };
    return { key: "race", title: "Race", items: raceItems };
  }, [active, raceItems, ageItems, sexItems]);

  const currentIndex = selected[current.key] ?? idOfMax(current.items);
  const centerName = current.items[currentIndex]?.name ?? "";
  const centerPct = current.items[currentIndex]?.percent ?? 0;

  return (
    <div className="demo-page">
      <div className="sub-header">A.I ANALYSIS</div>
      <h2 className="demo-title">DEMOGRAPHICS</h2>
      <h5 className="demo-sub-head">PREDICTED RACE AND AGE</h5>
      <h5 className="demo-wrong">
        If A.I estimate is wrong, select the correct one.
      </h5>

      <div className="container-grid">
        <div className="left-grid">
          <button
            className={`left-box ${active === "race" ? "is-active" : ""}`}
            onClick={() => setActive("race")}
          >
            <p className="demo-para">
              {raceItems[selectedIdx("race")]?.name ?? "-"}
            </p>
            <h4 className="demo-sub-title">RACE</h4>
          </button>

          <button
            className={`left-box ${active === "age" ? "is-active" : ""}`}
            onClick={() => setActive("age")}
          >
            <p className="demo-para">
              {ageItems[selectedIdx("age")]?.name ?? "-"}
            </p>
            <h4 className="demo-sub-title">AGE</h4>
          </button>

          <button
            className={`left-box ${active === "sex" ? "is-active" : ""}`}
            onClick={() => setActive("sex")}
          >
            <p className="demo-para">
              {sexItems[selectedIdx("sex")]?.name ?? "-"}
            </p>
            <h4 className="demo-sub-title">SEX</h4>
          </button>
        </div>
        <div className="center-grid">
          <h1 className="center-title">{centerName}</h1>
          <Donut percent={centerPct}  />
        </div>
        <div className="right-grid">
          <div className="right-title"></div>
          <Stats
            title={current.title}
            items={current.items}
            selectedIndex={currentIndex}
            onSelect={(i) => setSelected((s) => ({ ...s, [current.key]: i }))}
          />
        </div>
      </div>

      <div className="summary-btn">
        <Link to="/">
          <button className="proceed-button">
            HOME
            <img className="btn-img" src={right_btn} alt="" />
          </button>
        </Link>
      </div>

      <div className="back-btn">
        <Link to="/">
          <button className="back-button">
            <img className="btn-img" src={back_btn} alt="" />
            BACK
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Demographics;
