import React from "react";
import "./Stats.css";
import outer_line from "../../assets/images/rect-outer-line.svg";

const Stats = ({ title, items, selectedIndex = -1, onSelect = () =>{} }) => {
  return (
    <aside className="stat-box">
      <div className="stat-head">
        <span>{title}</span>
        <span>A.I CONFIDENCE</span>
      </div>

      <div className="stat-list">
        {items.map((it, i) => (
          <div
            className={`race-row ${i === selectedIndex ? "is-selected" : ""}`}
            key={it.name}
            onClick={() => onSelect?.(i)}
            role="button"
            tabIndex={0}
          >
            <div className="race-name">
              {outer_line ? <img src={outer_line} alt="" className="outer-white" /> : null}
              <span>{it.name}</span>
            </div>

            <span>{it.percent}%</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Stats;
