// import React from "react";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// ======= Shape =======
class TaperedTubeGeometry extends THREE.BufferGeometry {
  constructor(curve, tubularSegments, radiusStart, radiusEnd, radialSegments) {
    super();
    const frames = curve.computeFrenetFrames(tubularSegments, false);
    const positions = [];
    const indices = [];

    for (let i = 0; i <= tubularSegments; i++) {
      const t = i / tubularSegments;
      // Rayon qui diminue progressivement vers la pointe
      const radius = THREE.MathUtils.lerp(radiusStart, radiusEnd, t);
      const point = curve.getPoint(t);
      const normal = frames.normals[i];
      const binormal = frames.binormals[i];

      for (let j = 0; j <= radialSegments; j++) {
        const angle = (j / radialSegments) * Math.PI * 2;
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        positions.push(
          point.x + radius * (cos * normal.x + sin * binormal.x),
          point.y + radius * (cos * normal.y + sin * binormal.y),
          point.z + radius * (cos * normal.z + sin * binormal.z),
        );
      }
    }

    // Indices pour les faces
    for (let i = 0; i < tubularSegments; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const a = i * (radialSegments + 1) + j;
        const b = (i + 1) * (radialSegments + 1) + j;
        indices.push(a, b, a + 1);
        indices.push(b, b + 1, a + 1);
      }
    }

    // Génération des UVs
    const uvs = [];
    for (let i = 0; i <= tubularSegments; i++) {
      for (let j = 0; j <= radialSegments; j++) {
        uvs.push(i / tubularSegments, j / radialSegments);
      }
    }
    this.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    this.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    this.setIndex(indices);
    this.computeVertexNormals();
  }
}

// ======= Texture Seat =======
function loadTex(path, rx = 1, ry = 1.5) {
  const tex = new THREE.TextureLoader().load(path);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(rx, -ry);
  tex.needsUpdate = true;
  return tex;
}

// ======= Texture Chassis and Guide =======
function loadTexBg(path, rx = 1, ry = 1.5) {
  const tex = new THREE.TextureLoader().load(path);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(rx, -ry);
  tex.needsUpdate = true;
  return tex;
}

// ======= Seat =======
function createSitV(
  colorPath,
  offsetX,
  offsetY,
  offsetZ,
  offRotX,
  offRoty,
  offRotZ,
) {
  const points = [
    new THREE.Vector3(0.16, -0.05, 0),
    new THREE.Vector3(0.27, -0.1, 0),
    new THREE.Vector3(0.28, -0.05, 0),
    new THREE.Vector3(-0, -0.04, 0),
    new THREE.Vector3(-0.28, -0.05, 0),
    new THREE.Vector3(-0.27, -0.1, 0),
    new THREE.Vector3(-0.28, -0.1, 0),
  ];
  const curve = new THREE.CatmullRomCurve3(points);
  const mat = new THREE.MeshBasicMaterial({ map: loadTex(colorPath) });
  const mesh = new THREE.Mesh(
    new TaperedTubeGeometry(curve, 100, 0.04, 0.02, 2),
    mat,
  );
  mesh.position.set(offsetX, offsetY, offsetZ);
  mesh.rotation.set(offRotX, offRoty, offRotZ);
  mesh.name = "chassis";
  return { mesh, mat };
}
function createSitH(
  colorPath,
  offsetX,
  offsetY,
  offsetZ,
  offRotX,
  offRoty,
  offRotZ,
) {
  const points = [
    new THREE.Vector3(0.16, -0.05, 0),
    new THREE.Vector3(0.27, -0.1, 0),
    new THREE.Vector3(0.28, -0.05, 0),
    new THREE.Vector3(-0, -0.04, 0),
    new THREE.Vector3(-0.4, -0.05, 0),
    new THREE.Vector3(-0.37, -0.1, 0),
    new THREE.Vector3(-0.4, -0.1, 0),
  ];
  const curve = new THREE.CatmullRomCurve3(points);
  const mat = new THREE.MeshBasicMaterial({ map: loadTex(colorPath) });
  const mesh = new THREE.Mesh(
    new TaperedTubeGeometry(curve, 100, 0.04, 0.02, 2),
    mat,
  );
  mesh.position.set(offsetX, offsetY, offsetZ);
  mesh.rotation.set(offRotX, offRoty, offRotZ);
  mesh.name = "chassis";
  return { mesh, mat };
}
function createTubeChassisSit(
  colorPath,
  offsetX,
  offsetY,
  offsetZ,
  offRotX,
  offRotY,
  offRotZ,
) {
  const mat = new THREE.MeshBasicMaterial({
    map: loadTexBg(colorPath),
  });
  const mesh = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.03, 0.4, 32, 64),
    mat,
  );
  mesh.position.set(offsetX, offsetY, offsetZ);
  mesh.rotation.set(offRotX, offRotY, offRotZ);
  mesh.name =
    offsetX > 0 &&
    offsetY > 0 &&
    offsetZ > 0 &&
    offRotX > 0 &&
    offRotY > 0 &&
    offRotZ > 0
      ? "tube-sit-top"
      : "tube-sit-bottom";

  return { mesh, mat };
}

// ======= Chassis =======
function createTubeChassisLeft(
  colorPath,
  offsetX,
  offsetY,
  offsetZ,
  offRotX,
  offRotY,
  offRotZ,
) {
  const mat = new THREE.MeshBasicMaterial({ map: loadTexBg(colorPath) });
  const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.028, 0.14, 32), mat);
  mesh.position.set(offsetX, offsetY, offsetZ);
  mesh.rotation.set(offRotX, offRotY, offRotZ);
  mesh.name =
    offsetX > 0 &&
    offsetY > 0 &&
    offsetZ > 0 &&
    offRotX > 0 &&
    offRotY > 0 &&
    offRotZ > 0
      ? "tube-left-top"
      : "tube-left-bottom";

  return { mesh, mat };
}
function createTubeChassisRight(
  colorPath,
  offsetX,
  offsetY,
  offsetZ,
  offRotX,
  offRotY,
  offRotZ,
) {
  const mat = new THREE.MeshBasicMaterial({ map: loadTexBg(colorPath) });
  const mesh = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.028, 0.14, 32, 64, 64),
    mat,
  );
  mesh.position.set(offsetX, offsetY, offsetZ);
  mesh.rotation.set(offRotX, offRotY, offRotZ);
  mesh.name =
    offsetX > 0 &&
    offsetY > 0 &&
    offsetZ > 0 &&
    offRotX > 0 &&
    offRotY > 0 &&
    offRotZ > 0
      ? "tube-right-top"
      : "tube-right-Bottom";

  return { mesh, mat };
}

// ======= Hoop =======
function createTubeHoopRight(
  colorPath,
  offsetX,
  offsetY,
  offsetZ,
  offRotX,
  offRotY,
  offRotZ,
) {
  const points = [
    new THREE.Vector3(1.05, 0.02, 0.05),
    new THREE.Vector3(0.75, 0, 0.03),
    new THREE.Vector3(0.2, 0, 0.01),
    new THREE.Vector3(0.1, 0, -0.01),
    new THREE.Vector3(-0.1, 0.05, -0.03),
    new THREE.Vector3(-0.5, 0.05, -0.05),
  ];

  const curve = new THREE.CatmullRomCurve3(points);
  const mat = new THREE.MeshBasicMaterial({
    map: loadTexBg(colorPath),
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(
    new TaperedTubeGeometry(curve, 100, 0.04, 0.01, 20),
    mat,
  );
  mesh.position.set(offsetX, offsetY, offsetZ);
  mesh.rotation.set(offRotX, offRotY, offRotZ);
  mesh.name =
    offsetX > 0 &&
    offsetY > 0 &&
    offsetZ > 0 &&
    offRotX > 0 &&
    offRotY > 0 &&
    offRotZ > 0
      ? "tube-right-hoop"
      : "tube-right-hoop";

  return { mesh, mat };
}
function createTubeHoopLeft(
  colorPath,
  offsetX,
  offsetY,
  offsetZ,
  offRotX,
  offRotY,
  offRotZ,
) {
  const points = [
    new THREE.Vector3(1.05, 0.02, -0.05),
    new THREE.Vector3(0.75, 0, -0.03),
    new THREE.Vector3(0.2, 0, -0.01),
    new THREE.Vector3(0.1, 0, 0.01),
    new THREE.Vector3(-0.1, 0.05, 0.03),
    new THREE.Vector3(-0.5, 0.05, 0.05),
  ];

  const curve = new THREE.CatmullRomCurve3(points);
  const mat = new THREE.MeshBasicMaterial({
    map: loadTexBg(colorPath),
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(
    new TaperedTubeGeometry(curve, 100, 0.04, 0.01, 20),
    mat,
  );
  mesh.position.set(offsetX, offsetY, offsetZ);
  mesh.rotation.set(offRotX, offRotY, offRotZ);
  mesh.name =
    offsetX > 0 &&
    offsetY > 0 &&
    offsetZ > 0 &&
    offRotX > 0 &&
    offRotY > 0 &&
    offRotZ > 0
      ? "tube-right-hoop"
      : "tube-right-hoop";

  return { mesh, mat };
}
function createCapBottomHoop(
  colorPath,
  offsetX,
  offsetY,
  offsetZ,
  offRotX,
  offRotY,
  offRotZ,
) {
  const mat = new THREE.MeshBasicMaterial({
    map: loadTexBg(colorPath),
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 8), mat);
  mesh.position.set(offsetX, offsetY, offsetZ);
  mesh.rotation.set(offRotX, offRotY, offRotZ);
  mesh.name = "CapBottomHoop";
  return { mesh, mat };
}
function createCapTopHoop(
  colorPath,
  offsetX,
  offsetY,
  offsetZ,
  offRotX,
  offRotY,
  offRotZ,
) {
  const mat = new THREE.MeshBasicMaterial({
    map: loadTexBg(colorPath),
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.01, 8, 8), mat);
  mesh.position.set(offsetX, offsetY, offsetZ);
  mesh.rotation.set(offRotX, offRotY, offRotZ);
  mesh.name = "CapTopHoop";
  return { mesh, mat };
}

// ======= Skating =======
function createPatinRight(colorPath, offsetX, offsetY, offsetZ) {
  const points = [
    new THREE.Vector3(-0.9, -0.12, -0.1), // remontée arrière
    new THREE.Vector3(0, -0.12, -0.1), // partie basse plate
    new THREE.Vector3(0.6, -0.12, -0.1),
    new THREE.Vector3(0.7, 0, -0.12), // retroussé avant
    new THREE.Vector3(0.63, 0.28, -0.2), // retroussé avant
  ];
  const curve = new THREE.CatmullRomCurve3(points);
  const mat = new THREE.MeshBasicMaterial({
    map: loadTexBg(colorPath),
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(
    new TaperedTubeGeometry(curve, 20, 0.045, 0.01, 20),
    mat,
  );
  mesh.position.set(offsetX, offsetY, offsetZ);
  mesh.name = "patinDroit";
  return { mesh, mat };
}
function createPatinLeft(colorPath, offsetX, offsetY, offsetZ) {
  const points = [
    new THREE.Vector3(-0.9, -0.12, 0.1), // remontée arrière
    new THREE.Vector3(0, -0.12, 0.1), // partie basse plate
    new THREE.Vector3(0.6, -0.12, 0.1),
    new THREE.Vector3(0.7, 0, 0.12), // retroussé avant
    new THREE.Vector3(0.63, 0.28, 0.2), // retroussé avant
  ];
  const curve = new THREE.CatmullRomCurve3(points);
  const mat = new THREE.MeshBasicMaterial({
    map: loadTexBg(colorPath),
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(
    new TaperedTubeGeometry(curve, 100, 0.045, 0.01, 20),
    mat,
  );
  mesh.position.set(offsetX, offsetY, offsetZ);
  mesh.name = "patinGauche";
  return { mesh, mat };
}
function createCapBottom(
  colorPath,
  offsetX,
  offsetY,
  offsetZ,
  offRotX,
  offRotY,
  offRotZ,
) {
  const mat = new THREE.MeshBasicMaterial({
    map: loadTex(colorPath),
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), mat);
  mesh.position.set(offsetX, offsetY, offsetZ);
  mesh.rotation.set(offRotX, offRotY, offRotZ);
  mesh.name = "CapBottom";
  return { mesh, mat };
}
function createCapTop(
  colorPath,
  offsetX,
  offsetY,
  offsetZ,
  offRotX,
  offRotY,
  offRotZ,
) {
  const mat = new THREE.MeshBasicMaterial({
    map: loadTex(colorPath),
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.01, 8, 8), mat);
  mesh.position.set(offsetX, offsetY, offsetZ);
  mesh.rotation.set(offRotX, offRotY, offRotZ);
  mesh.name = "CapTop";
  return { mesh, mat };
}

// ======= Guide =======
function createGuide(
  colorPath,
  offsetX,
  offsetY,
  offsetZ,
  offRotX,
  offRotY,
  offRotZ,
) {
  const points = [
    new THREE.Vector3(0.7, 0.4, 0.15),
    new THREE.Vector3(0.5, 0.4, 0.15),
    new THREE.Vector3(0.2, 0.4, 0.15),
    new THREE.Vector3(-0.2, 0.4, 0.15),
    new THREE.Vector3(-0.4, 0.4, 0.15),
    new THREE.Vector3(-0.2, 0.3, 0.15),
    new THREE.Vector3(0.5, 0.4, 0.15),
    new THREE.Vector3(0.7, 0.4, 0.15),
  ];
  const curve = new THREE.CatmullRomCurve3(points);
  const mat = new THREE.MeshBasicMaterial({
    map: loadTexBg(colorPath),
  });
  const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 100, 0.01, 20),
    mat,
  );
  mesh.position.set(offsetX, offsetY, offsetZ);
  mesh.rotation.set(offRotX, offRotY, offRotZ);
  mesh.name = "guide";
  return { mesh, mat };
}

// ======= Sled =======
const Luge = ({ scene, selectedColor, backgroundColor, guide }) => {
  const groupRef = useRef(null);
  const chassisMatsRef = useRef([]);

  useEffect(() => {
    const lugeGroup = new THREE.Group();
    lugeGroup.name = "luge";
    chassisMatsRef.current = [];

    // ======= Seat =======
    const sitPartsV = [
      createSitV(selectedColor, -0.7, 0.325, 0, 0, 1.57, 0),
      createSitV(selectedColor, -0.6, 0.33, 0, 0, 1.57, 0),
      createSitV(selectedColor, -0.5, 0.335, 0, 0, 1.57, 0),
      createSitV(selectedColor, -0.4, 0.34, 0, 0, 1.57, 0),
      createSitV(selectedColor, -0.3, 0.345, 0, 0, 1.57, 0),
      createSitV(selectedColor, -0.2, 0.35, 0, 0, 1.57, 0),
    ];
    sitPartsV.forEach(({ mesh, mat }) => {
      lugeGroup.add(mesh);
      chassisMatsRef.current.push(mat);
    });

    const sitPartsH = [
      createSitH(selectedColor, -0.4, 0.34, 0.2, 0, 0, 0.05),
      createSitH(selectedColor, -0.4, 0.34, 0.1, 0, 0, 0.05),
      createSitH(selectedColor, -0.4, 0.34, 0, 0, 0, 0.05),
      createSitH(selectedColor, -0.4, 0.34, -0.1, 0, 0, 0.05),
      createSitH(selectedColor, -0.4, 0.34, -0.2, 0, 0, 0.05),
    ];
    sitPartsH.forEach(({ mesh, mat }) => {
      lugeGroup.add(mesh);
      chassisMatsRef.current.push(mat);
    });

    const tubeGroupSit = [
      createTubeChassisSit(backgroundColor, -0.745, 0.25, 0, 1.57, 1.57, 0),
      createTubeChassisSit(backgroundColor, -0.155, 0.285, 0, 1.57, 1.57, 0),
    ];
    tubeGroupSit.forEach(({ mesh, mat }) => {
      lugeGroup.add(mesh);
      chassisMatsRef.current.push(mat);
    });

    // ======= Chassis =======
    const tubeGroupLeft = [
      createTubeChassisLeft(backgroundColor, -0.75, 0.15, -0.26, 0, -0.1, -0.4),
      createTubeChassisLeft(backgroundColor, -0.2, 0.16, -0.26, 0, 0, 0.2),
    ];
    tubeGroupLeft.forEach(({ mesh, mat }) => {
      lugeGroup.add(mesh);
      chassisMatsRef.current.push(mat);
    });

    const tubeGroupRight = [
      createTubeChassisRight(backgroundColor, -0.75, 0.15, 0.26, 0, 0.1, -0.4),
      createTubeChassisRight(backgroundColor, -0.2, 0.16, 0.26, 0, 0, 0.2),
    ];
    tubeGroupRight.forEach(({ mesh, mat }) => {
      lugeGroup.add(mesh);
      chassisMatsRef.current.push(mat);
    });
    // ======= Hoop =======
    const hoopRight = createTubeHoopRight(
      backgroundColor,
      0.2,
      0.28,
      0.24,
      1.57,
      0,
      3.13,
    );
    lugeGroup.add(hoopRight.mesh);
    chassisMatsRef.current.push(hoopRight.mat);

    const hoopLeft = createTubeHoopLeft(
      backgroundColor,
      0.2,
      0.28,
      -0.24,
      -1.57,
      0,
      3.13,
    );
    lugeGroup.add(hoopLeft.mesh);
    chassisMatsRef.current.push(hoopLeft.mat);

    const capGroupBtmHoop = [
      createCapBottomHoop(backgroundColor, -0.84, 0.235, 0.23, 0, 0, 0),
      createCapBottomHoop(backgroundColor, -0.84, 0.235, -0.23, 0, 0, 0),
    ];
    capGroupBtmHoop.forEach(({ mesh, mat }) => {
      lugeGroup.add(mesh);
      chassisMatsRef.current.push(mat);
    });

    const capGroupTopHoop = [
      createCapTopHoop(backgroundColor, 0.7, 0.33, 0.184, 0, 0, 0),
      createCapTopHoop(backgroundColor, 0.7, 0.33, -0.184, 0, 0, 0),
    ];
    capGroupTopHoop.forEach(({ mesh, mat }) => {
      lugeGroup.add(mesh);
      chassisMatsRef.current.push(mat);
    });

    // ======= Skating =======
    const patinsRight = createPatinRight(backgroundColor, 0, 0.19, 0.37);
    lugeGroup.add(patinsRight.mesh);
    chassisMatsRef.current.push(patinsRight.mat);

    const patinsLeft = createPatinLeft(backgroundColor, 0, 0.19, -0.37);
    lugeGroup.add(patinsLeft.mesh);
    chassisMatsRef.current.push(patinsLeft.mat);

    const capGroupBtm = [
      createCapBottom(backgroundColor, -0.88, 0.08, 0.27, 0, 0, 0),
      createCapBottom(backgroundColor, -0.88, 0.08, -0.27, 0, 0, 0),
    ];
    capGroupBtm.forEach(({ mesh, mat }) => {
      lugeGroup.add(mesh);
      chassisMatsRef.current.push(mat);
    });

    const capGroupTop = [
      createCapTop(backgroundColor, 0.63, 0.465, 0.171, 0, 0, 0),
      createCapTop(backgroundColor, 0.63, 0.465, -0.171, 0, 0, 0),
    ];
    capGroupTop.forEach(({ mesh, mat }) => {
      lugeGroup.add(mesh);
      chassisMatsRef.current.push(mat);
    });

    // ======= Guide =======
    const guideGroup = [
      createGuide(guide, -0.03, 0.2, 0.52, -1.57, 0, -0.1),
      createGuide(guide, -0.03, 0.5, -0.52, 1.57, 0, -0.1),
    ];
    guideGroup.forEach(({ mesh, mat }) => {
      lugeGroup.add(mesh);
      chassisMatsRef.current.push(mat);
    });
    // =====================================================
    groupRef.current = lugeGroup;
    scene.add(lugeGroup);

    return () => {
      scene.remove(lugeGroup);
      lugeGroup.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry.dispose();
          obj.material.dispose();
        }
      });
    };
  }, [scene, selectedColor, backgroundColor, guide]);

  return null;
};

export default Luge;
