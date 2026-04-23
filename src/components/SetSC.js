// import React from "react";
import * as THREE from "three";
import { Luge } from "./Luge.js";
// import { createLugeSport } from "./LugeSport";
// import { createLugeKind } from "./LugeKind";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useEffect, useRef } from "react";

const SetSC = () => {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      15,
      mount.innerWidth / mount.innerHeight,
      0.1,
      1000,
    );

    const renderer = new THREE.WebGLRenderer();

    mount.addEventListener("resize", () => {
      // camera.aspecct = mount.innerWidth / mount.innerHeight;
      camera.updateProjectionMatrix();
      // renderer.setSize(mount.innerWidth, mount.innerHeight);
    });
    renderer.setSize(400, 300);
    // renderer.setSize(800, 600);

    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const gridHelper = new THREE.GridHelper(30, 30); // taille 20, 20 divisions

    let luge = null;
    // let lugeKind = null;
    // let lugeSport = null;
    const lugeBtn = document.getElementById("luge");
    // const lugeKBtn = document.getElementById("lugeKind");
    // const lugeSBtn = document.getElementById("lugeSport");

    lugeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      luge = Luge();
      // luge.position.X = time / 2000;
      scene.add(luge);
      // scene.remove(lugeSport);
      // scene.remove(lugeKind);
    });

    // lugeKBtn.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   console.log(lugeKBtn.value);

    //   lugeKind = createLugeKind();
    //   scene.add(lugeKind);
    //   scene.remove(luge);
    //   scene.remove(lugeSport);
    // });

    // lugeSBtn.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   lugeSport = createLugeSport();
    //   scene.add(lugeSport);
    //   scene.remove(luge);
    //   scene.remove(lugeKind);
    // });

    // Lumière ambiante (éclaire toute la scène de façon uniforme)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // couleur, intensité

    // Lumière directionnelle (comme le soleil)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(25, 20, 15); // positionne la lumière

    scene.add(ambientLight);
    scene.add(directionalLight);
    scene.add(gridHelper);
    camera.position.set(3, 4, -5);
    // scene.add(createLugeSport());

    camera.lookAt(0, 0, 0);
    controls.update();

    function animate(time) {
      // Demande au renderer d'afficher la scène du point de vue de la caméra
      scene.add(luge);
      controls.update();
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);
  }, []); //
  // return <div ref={mountRef}></div>;
};

export default SetSC;
