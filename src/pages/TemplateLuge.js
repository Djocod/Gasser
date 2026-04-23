import React, { useState } from "react";
import SetSC from "../components/SetSC.js";
// import COLORS from "../color.json";
const img1 = require("../asset/img/gurteblaurotgraugelbb(1).jpeg");
const img2 = require("../asset/img/gurterotschwarzb(2).jpeg");
const img3 = require("../asset/img/gurterotblaub(2).jpeg");
const img4 = require("../asset/img/gurten-vilolett-blau-trkis-b(1).jpeg");
const img5 = require("../asset/img/beige.jpeg");
const woodBg = require("../asset/img/bois-1.jpg");
const guideColor = require("../asset/img/cuir2.jpeg");

const COLORS = [
  { id: "color-1", value: img1, src: img1, bg: woodBg, guide: guideColor },
  { id: "color-2", value: img2, src: img2, bg: woodBg, guide: guideColor },
  { id: "color-3", value: img3, src: img3, bg: woodBg, guide: guideColor },
  { id: "color-4", value: img4, src: img4, bg: woodBg, guide: guideColor },
  { id: "color-5", value: img5, src: img5, bg: woodBg, guide: guideColor },
];

const TemplateLuge = () => {
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
  const [backgroundColor, setBackgroundColor] = useState(COLORS[0].bg);
  const [guide, setGuide] = useState(COLORS[0].guide);
  const [showLuge, setShowLuge] = useState(false);
  return (
    <div>
      <form className="setForm">
        <div className="input input-img">
          <p>color</p>
          {COLORS.map((color) => (
            <button
              key={color.id}
              className="color-1"
              id={color.id}
              value={color.value}
              onClick={(e) => {
                e.preventDefault();
                setSelectedColor(color.value);
                setBackgroundColor(color.bg);
                setGuide(color.guide);
              }}
            >
              <img src={color.src} alt="" height="20px" width="20px" />
            </button>
          ))}
        </div>

        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowLuge(true);
            }}
          >
            Luge
          </button>
        </div>
        <p>Possibilité de gravure.</p>
        <textarea name="" id=""></textarea>
      </form>
      <SetSC
        showLuge={showLuge}
        selectedColor={selectedColor}
        backgroundColor={backgroundColor}
        guide={guide}
      />
    </div>
  );
};

export default TemplateLuge;
