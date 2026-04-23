import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Luge from "./Luge.js";

const SetSC = ({ showLuge, selectedColor, backgroundColor, guide }) => {
  const mountRef = useRef(null);
  const [scene, setScene] = useState(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const threScene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      15,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    threScene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(25, 20, 15);
    threScene.add(dirLight);
    threScene.add(new THREE.GridHelper(30, 30));

    camera.position.set(3, 4, -5);
    camera.lookAt(0, 0, 0);
    controls.update();

    renderer.setAnimationLoop(() => {
      controls.update();
      renderer.render(threScene, camera);
    });

    setScene(threScene);

    return () => {
      renderer.setAnimationLoop(null);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={mountRef} style={{ width: "800px", height: "700px" }}>
      {scene && showLuge && (
        <Luge
          scene={scene}
          selectedColor={selectedColor}
          backgroundColor={backgroundColor}
          guide={guide}
        />
      )}
    </div>
  );
};

export default SetSC;
