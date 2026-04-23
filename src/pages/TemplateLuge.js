import React from "react";
import SetSC from "../components/SetSC.js";

const TemplateLuge = () => {
  return (
    <div>
      <form className="setForm">
        <div className="input input-img">
          <p>color</p>
          <button
            className="color-1"
            id="color-1"
            value="./img/gurteblaurotgraugelbb(1).jpeg"
          >
            <img
              src={require("../asset/img/gurteblaurotgraugelbb(1).jpeg")}
              alt=""
              height="20px"
              width="20px"
            />
          </button>
          <button
            className="color-2"
            id="color-2"
            value="./img/gurterotschwarzb(2).jpeg"
          >
            <img
              src={require("../asset/img//gurterotschwarzb(2).jpeg")}
              alt=""
              height="20px"
              width="20px"
            />
          </button>
          <button
            className="color-3"
            id="color-3"
            value="./img/gurterotblaub(2).jpeg"
          >
            <img
              src={require("../asset/img/gurterotblaub(2).jpeg")}
              alt=""
              height="20px"
              width="20px"
            />
          </button>
          <button
            className="color-4"
            id="color-4"
            value="./img/gurten-vilolett-blau-trkis-b(1).jpeg"
          >
            <img
              src={require("../asset/img/gurten-vilolett-blau-trkis-b(1).jpeg")}
              alt=""
              height="20px"
              width="20px"
            />
          </button>
          <button className="color-5" id="color-5" value="./img/beige.jpeg">
            <img
              src={require("../asset/img/beige.jpeg")}
              alt=""
              height="20px"
              width="20px"
            />
          </button>
        </div>

        <div className="patin-color">
          <p>Color Patin</p>
          <button className="patin-1" id="patin-1" value="./img/bois-1.jpg">
            <img
              src={require("../asset/img/bois-1.jpg")}
              alt=""
              height="20px"
              width="20px"
            />
          </button>
          <button
            className="patin-2"
            id="patin-2"
            value="./img/padoukdafrique.jpg"
          >
            <img
              src={require("../asset/img/padoukdafrique.jpg")}
              alt=""
              height="20px"
              width="20px"
            />
          </button>
        </div>
        <div>
          <button id="luge" value="luge">
            Luge
          </button>
          <button id="lugeKind" value="lugeKind">
            Luge Kind
          </button>
          <button id="lugeSport" value="lugeSport">
            Luge sport
          </button>
        </div>
        <p>Possibilité de gravure.</p>
        <textarea name="" id=""></textarea>
      </form>
      <SetSC />
    </div>
  );
};

export default TemplateLuge;
