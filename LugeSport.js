import * as THREE from "three";

// ============ siège ============
function createChassis(offsetX, offsetY, offsetZ, offRotX, offRoty, offRotZ) {
  const color1 = document.getElementById("color-1");
  const color2 = document.getElementById("color-2");
  const color3 = document.getElementById("color-3");
  const color4 = document.getElementById("color-4");
  const color5 = document.getElementById("color-5");
  // console.log(inputs, bois1, bois2);

  const points = [
    new THREE.Vector3(0.16, -0.05, 0),
    new THREE.Vector3(0.27, -0.1, 0),
    new THREE.Vector3(0.28, -0.05, 0),
    new THREE.Vector3(-0, -0.04, 0),
    new THREE.Vector3(-0.28, -0.05, 0),
    new THREE.Vector3(-0.27, -0.1, 0),
    new THREE.Vector3(-0.25, -0.1, 0),
  ];

  const curve = new THREE.CatmullRomCurve3(points);

  class TaperedTubeGeometry extends THREE.BufferGeometry {
    constructor(
      curve,
      tubularSegments,
      radiusStart,
      radiusEnd,
      radialSegments,
    ) {
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

  const textureLoader = new THREE.TextureLoader();
  const weaveTexture = textureLoader.load("./img/gurterotschwarzb(2).jpeg");
  weaveTexture.wrapS = THREE.RepeatWrapping;
  weaveTexture.wrapT = THREE.RepeatWrapping;
  weaveTexture.repeat.set(1, 1.5);
  weaveTexture.offset.set(0, 0);
  weaveTexture.repeat.y *= -1;
  weaveTexture.needsUpdate = true;

  const geo = new TaperedTubeGeometry(curve, 100, 0.04, 0.02, 2, false);
  const mat = new THREE.MeshBasicMaterial({ map: weaveTexture });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.x = offsetX;
  mesh.position.y = offsetY;
  mesh.position.z = offsetZ;
  mesh.rotation.x = offRotX;
  mesh.rotation.y = offRoty;
  mesh.rotation.z = offRotZ;
  mesh.name = "chassis";

  color1.addEventListener("click", (e) => {
    e.preventDefault();
    const newTex = textureLoader.load(color1.value);
    newTex.wrapS = THREE.RepeatWrapping;
    newTex.wrapT = THREE.RepeatWrapping;
    newTex.repeat.set(1, 1.5);
    newTex.repeat.y *= -1;
    mat.map = newTex;
    mat.needsUpdate = true;
  });

  color2.addEventListener("click", (e) => {
    e.preventDefault();
    const newTex = textureLoader.load(color2.value);
    newTex.wrapS = THREE.RepeatWrapping;
    newTex.wrapT = THREE.RepeatWrapping;
    newTex.repeat.set(1, 1.5);
    newTex.repeat.y *= -1;
    mat.map = newTex;
    mat.needsUpdate = true;
  });

  color3.addEventListener("click", (e) => {
    e.preventDefault();
    const newTex = textureLoader.load(color3.value);
    newTex.wrapS = THREE.RepeatWrapping;
    newTex.wrapT = THREE.RepeatWrapping;
    newTex.repeat.set(1, 1.5);
    newTex.repeat.y *= -1;
    mat.map = newTex;
    mat.needsUpdate = true;
  });

  color4.addEventListener("click", (e) => {
    e.preventDefault();
    const newTex = textureLoader.load(color4.value);
    newTex.wrapS = THREE.RepeatWrapping;
    newTex.wrapT = THREE.RepeatWrapping;
    newTex.repeat.set(1, 1.5);
    newTex.repeat.y *= -1;
    mat.map = newTex;
    mat.needsUpdate = true;
  });

  color5.addEventListener("click", (e) => {
    e.preventDefault();
    const newTex = textureLoader.load(color5.value);
    newTex.wrapS = THREE.RepeatWrapping;
    newTex.wrapT = THREE.RepeatWrapping;
    newTex.repeat.set(1, 1.5);
    newTex.repeat.y *= -1;
    mat.map = newTex;
    mat.needsUpdate = true;
  });

  return mesh;
}
function createTubeChassisSit(offsetX, offsetY, offsetZ, offRoty, offRotZ) {
  const textureLoader = new THREE.TextureLoader();
  const weaveTexture = textureLoader.load("./img/bois-1.jpg");
  weaveTexture.wrapS = THREE.RepeatWrapping;
  weaveTexture.wrapT = THREE.RepeatWrapping;
  weaveTexture.repeat.set(1, 1.5);
  weaveTexture.offset.set(0, 0);
  weaveTexture.repeat.y *= -1;
  weaveTexture.needsUpdate = true;

  const geo = new THREE.CapsuleGeometry(0.03, 0.4, 32, 64, 64, true);
  const mat = new THREE.MeshBasicMaterial({
    map: weaveTexture,
    // roughness: 1,
  });

  const mesh = new THREE.Mesh(geo, mat);

  mesh.position.x = offsetX;
  mesh.position.y = offsetY;
  mesh.position.z = offsetZ;
  mesh.rotation.y = offRoty;
  mesh.rotation.z = offRotZ;
  mesh.name =
    offsetX > 0 && offsetY > 0 && offsetZ > 0 && offRoty > 0 && offRotZ > 0
      ? "tube-sit-top"
      : "tube-sit-bottom";

  return mesh;
}

// ============ chassis patin============
function createTubeChassisLeft(
  offsetX,
  offsetY,
  offsetZ,
  offRotX,
  offRoty,
  offRotZ,
) {
  const points = [
    new THREE.Vector3(0, -0.08, 0.03),
    new THREE.Vector3(0, -0.14, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0.14, 0.03),
    new THREE.Vector3(0, 0.06, 0.03),
  ];

  const curve = new THREE.CatmullRomCurve3(points);
  const textureLoader = new THREE.TextureLoader();
  const weaveTexture = textureLoader.load("./img/tirolBlue1.jpg");
  weaveTexture.wrapS = THREE.RepeatWrapping;
  weaveTexture.wrapT = THREE.RepeatWrapping;
  weaveTexture.repeat.set(1, 1.5);
  weaveTexture.offset.set(0, 0);
  weaveTexture.repeat.y *= -1;
  weaveTexture.needsUpdate = true;

  const geo = new THREE.TubeGeometry(curve, 3, 0.03, 2, false);
  const mat = new THREE.MeshBasicMaterial({
    map: weaveTexture,
    // roughness: 1,
  });

  const mesh = new THREE.Mesh(geo, mat);

  mesh.position.x = offsetX;
  mesh.position.y = offsetY;
  mesh.position.z = offsetZ;
  mesh.rotation.x = offRotX;
  mesh.rotation.y = offRoty;
  mesh.rotation.z = offRotZ;
  mesh.name =
    offsetX > 0 && offsetY > 0 && offsetZ > 0 && offRoty > 0 && offRotZ > 0
      ? "tube-left-top"
      : "tube-left-bottom";

  return mesh;
}
function createTubeChassisRight(offsetX, offsetY, offsetZ, offRoty, offRotZ) {
  const points = [
    new THREE.Vector3(0, 0.08, -0.03),
    new THREE.Vector3(0, 0.14, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, -0.12, 0.03),
    new THREE.Vector3(0, -0.06, 0.03),
  ];

  const curve = new THREE.CatmullRomCurve3(points);
  const textureLoader = new THREE.TextureLoader();
  const weaveTexture = textureLoader.load("./img/tirolBlue1.jpg");
  weaveTexture.wrapS = THREE.RepeatWrapping;
  weaveTexture.wrapT = THREE.RepeatWrapping;
  weaveTexture.repeat.set(1, 1.5);
  weaveTexture.offset.set(0, 0);
  weaveTexture.repeat.y *= -1;
  weaveTexture.needsUpdate = true;

  const geo = new THREE.TubeGeometry(curve, 3, 0.03, 2, false);
  const mat = new THREE.MeshBasicMaterial({
    map: weaveTexture,
    // roughness: 1,
  });
  // const mat = new THREE.MeshBasicMaterial({
  //   color: "#15d9eb",
  // });

  const mesh = new THREE.Mesh(geo, mat);

  mesh.position.x = offsetX;
  mesh.position.y = offsetY;
  mesh.position.z = offsetZ;
  mesh.rotation.y = offRoty;
  mesh.rotation.z = offRotZ;
  mesh.name =
    offsetX > 0 && offsetY > 0 && offsetZ > 0 && offRoty > 0 && offRotZ > 0
      ? "tube-right-top"
      : "tube-right-Bottom";

  return mesh;
}

// ============ chassis renfort ============
function createTubeHoopRight(
  offsetX,
  offsetY,
  offsetZ,
  offRotX,
  offRoty,
  offRotZ,
) {
  const points = [
    new THREE.Vector3(0.95, 0.02, 0.05),
    new THREE.Vector3(0.75, 0, 0.03),
    new THREE.Vector3(0.2, 0, 0.01),
    new THREE.Vector3(0.1, 0, -0.01),
    new THREE.Vector3(-0.1, 0.05, -0.03),
    new THREE.Vector3(-0.5, 0.05, -0.05),
  ];

  const curve = new THREE.CatmullRomCurve3(points);

  class TaperedTubeGeometry extends THREE.BufferGeometry {
    constructor(
      curve,
      tubularSegments,
      radiusStart,
      radiusEnd,
      radialSegments,
    ) {
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

  const textureLoader = new THREE.TextureLoader();
  const weaveTexture = textureLoader.load("./img/bois-1.jpg");
  weaveTexture.wrapS = THREE.RepeatWrapping;
  weaveTexture.wrapT = THREE.RepeatWrapping;
  weaveTexture.repeat.set(1, 1.5);
  weaveTexture.offset.set(0, 0);
  weaveTexture.repeat.y *= -1;
  weaveTexture.needsUpdate = true;

  const geo = new TaperedTubeGeometry(curve, 100, 0.04, 0.01, 20);
  const mat = new THREE.MeshBasicMaterial({
    map: weaveTexture,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geo, mat);

  mesh.position.x = offsetX;
  mesh.position.y = offsetY;
  mesh.position.z = offsetZ;
  mesh.rotation.x = offRotX;
  mesh.rotation.y = offRoty;
  mesh.rotation.z = offRotZ;
  mesh.name =
    offsetX > 0 &&
    offsetY > 0 &&
    offRoty > 0 &&
    offRotX > 0 &&
    offsetZ > 0 &&
    offRotZ > 0
      ? "tube-right-hoop"
      : "tube-right-hoop";

  return mesh;
}
function createTubeHoopLeft(
  offsetX,
  offsetY,
  offsetZ,
  offRotX,
  offRoty,
  offRotZ,
) {
  const points = [
    new THREE.Vector3(0.95, 0.02, -0.05),
    new THREE.Vector3(0.75, 0, -0.03),
    new THREE.Vector3(0.2, 0, -0.01),
    new THREE.Vector3(0.1, 0, 0.01),
    new THREE.Vector3(-0.1, 0.05, 0.03),
    new THREE.Vector3(-0.5, 0.05, 0.05),
  ];

  const curve = new THREE.CatmullRomCurve3(points);
  // Classe custom qui fait varier le rayon le long de la courbe
  class TaperedTubeGeometry extends THREE.BufferGeometry {
    constructor(
      curve,
      tubularSegments,
      radiusStart,
      radiusEnd,
      radialSegments,
    ) {
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
  const textureLoader = new THREE.TextureLoader();
  const weaveTexture = textureLoader.load("./img/bois-1.jpg");
  weaveTexture.wrapS = THREE.RepeatWrapping;
  weaveTexture.wrapT = THREE.RepeatWrapping;
  weaveTexture.repeat.set(1, 1.5);
  weaveTexture.offset.set(0, 0);
  weaveTexture.repeat.y *= -1;
  weaveTexture.needsUpdate = true;

  const geo = new TaperedTubeGeometry(curve, 100, 0.04, 0.01, 20);
  const mat = new THREE.MeshBasicMaterial({
    map: weaveTexture,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geo, mat);

  mesh.position.x = offsetX;
  mesh.position.y = offsetY;
  mesh.position.z = offsetZ;
  mesh.rotation.x = offRotX;
  mesh.rotation.y = offRoty;
  mesh.rotation.z = offRotZ;
  mesh.name =
    offsetX > 0 &&
    offsetY > 0 &&
    offRoty > 0 &&
    offRotX > 0 &&
    offsetZ > 0 &&
    offRotZ > 0
      ? "tube-right-hoop"
      : "tube-right-hoop";

  return mesh;
}
function createCapBottomHoop(
  offsetX,
  offsetY,
  offsetZ,
  offRotX,
  offRoty,
  offRotZ,
) {
  const textureLoader = new THREE.TextureLoader();
  const weaveTexture = textureLoader.load("./img/bois-1.jpg");
  weaveTexture.wrapS = THREE.RepeatWrapping;
  weaveTexture.wrapT = THREE.RepeatWrapping;
  weaveTexture.repeat.set(1, 1);
  weaveTexture.offset.set(0, 0);
  weaveTexture.repeat.y *= -1;
  weaveTexture.needsUpdate = true;
  const geo = new THREE.SphereGeometry(0.039, 8, 8);
  const mat = new THREE.MeshBasicMaterial({
    map: weaveTexture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.x = offsetX;
  mesh.position.y = offsetY;
  mesh.position.z = offsetZ;
  mesh.rotation.x = offRotX;
  mesh.rotation.y = offRoty;
  mesh.rotation.z = offRotZ;
  mesh.name = "CapBottomHoop";
  return mesh;
}
function createCapTopHoop(
  offsetX,
  offsetY,
  offsetZ,
  offRotX,
  offRoty,
  offRotZ,
) {
  const textureLoader = new THREE.TextureLoader();
  const weaveTexture = textureLoader.load("./img/bois-1.jpg");
  weaveTexture.wrapS = THREE.RepeatWrapping;
  weaveTexture.wrapT = THREE.RepeatWrapping;
  weaveTexture.repeat.set(1, 1);
  weaveTexture.offset.set(0, 0);
  weaveTexture.repeat.y *= -1;
  weaveTexture.needsUpdate = true;
  const geo = new THREE.SphereGeometry(0.01, 8, 8);
  const mat = new THREE.MeshBasicMaterial({
    map: weaveTexture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.x = offsetX;
  mesh.position.y = offsetY;
  mesh.position.z = offsetZ;
  mesh.rotation.x = offRotX;
  mesh.rotation.y = offRoty;
  mesh.rotation.z = offRotZ;
  mesh.name = "CapTopHoop";
  return mesh;
}

// ============ Patin ============
function createPatinRight(offsetZ, offsetY) {
  const points = [
    new THREE.Vector3(-0.8, -0.12, -0.1), // remontée arrière
    new THREE.Vector3(0, -0.12, -0.1), // partie basse plate
    new THREE.Vector3(0.6, -0.12, -0.1),
    new THREE.Vector3(0.7, 0, -0.12), // retroussé avant
    new THREE.Vector3(0.63, 0.28, -0.2), // retroussé avant
  ];
  const curve = new THREE.CatmullRomCurve3(points);
  // Classe custom qui fait varier le rayon le long de la courbe
  class TaperedTubeGeometry extends THREE.BufferGeometry {
    constructor(
      curve,
      tubularSegments,
      radiusStart,
      radiusEnd,
      radialSegments,
    ) {
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

  const textureLoader = new THREE.TextureLoader();
  const weaveTexture = textureLoader.load("./img/padoukdafrique.jpg");
  weaveTexture.wrapS = THREE.RepeatWrapping;
  weaveTexture.wrapT = THREE.RepeatWrapping;
  weaveTexture.repeat.set(1, 1.5);
  weaveTexture.offset.set(0, 0);
  weaveTexture.repeat.y *= -1;
  weaveTexture.needsUpdate = true;

  const geo = new TaperedTubeGeometry(curve, 100, 0.045, 0.02, 5);
  const mat = new THREE.MeshBasicMaterial({
    map: weaveTexture,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.z = offsetZ;
  mesh.position.y = offsetY;
  mesh.name = "patinDroit";
  return mesh;
}
function createPatinLeft(offsetZ, offsetY) {
  const points = [
    new THREE.Vector3(-0.8, -0.12, 0.1), // remontée arrière
    new THREE.Vector3(0, -0.12, 0.1), // partie basse plate
    new THREE.Vector3(0.6, -0.12, 0.1),
    new THREE.Vector3(0.7, 0, 0.12), // retroussé avant
    new THREE.Vector3(0.63, 0.28, 0.2), // retroussé avant
  ];
  const curve = new THREE.CatmullRomCurve3(points);
  // Classe custom qui fait varier le rayon le long de la courbe
  class TaperedTubeGeometry extends THREE.BufferGeometry {
    constructor(
      curve,
      tubularSegments,
      radiusStart,
      radiusEnd,
      radialSegments,
    ) {
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

  const textureLoader = new THREE.TextureLoader();
  const weaveTexture = textureLoader.load("./img/padoukdafrique.jpg");
  weaveTexture.wrapS = THREE.RepeatWrapping;
  weaveTexture.wrapT = THREE.RepeatWrapping;
  weaveTexture.repeat.set(1, 1);
  weaveTexture.offset.set(0, 0);
  weaveTexture.repeat.y *= -1;
  weaveTexture.needsUpdate = true;

  const geo = new TaperedTubeGeometry(curve, 100, 0.045, 0.02, 5);
  const mat = new THREE.MeshBasicMaterial({
    map: weaveTexture,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.z = offsetZ;
  mesh.position.y = offsetY;
  mesh.name = "patinGauche";
  return mesh;
}
function createCapBottom(offsetX, offsetY, offsetZ, offRotX, offRoty, offRotZ) {
  const textureLoader = new THREE.TextureLoader();
  const weaveTexture = textureLoader.load("./img/padoukdafrique.jpg");
  weaveTexture.wrapS = THREE.RepeatWrapping;
  weaveTexture.wrapT = THREE.RepeatWrapping;
  weaveTexture.repeat.set(1, 1);
  weaveTexture.offset.set(0, 0);
  weaveTexture.repeat.y *= -1;
  weaveTexture.needsUpdate = true;
  const geo = new THREE.SphereGeometry(0.04, 8, 8);
  const mat = new THREE.MeshBasicMaterial({
    map: weaveTexture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.x = offsetX;
  mesh.position.y = offsetY;
  mesh.position.z = offsetZ;
  mesh.rotation.x = offRotX;
  mesh.rotation.y = offRoty;
  mesh.rotation.z = offRotZ;
  mesh.name = "CapBottom";
  return mesh;
}
function createCapTop(offsetX, offsetY, offsetZ, offRotX, offRoty, offRotZ) {
  const textureLoader = new THREE.TextureLoader();
  const weaveTexture = textureLoader.load("./img/padoukdafrique.jpg");
  weaveTexture.wrapS = THREE.RepeatWrapping;
  weaveTexture.wrapT = THREE.RepeatWrapping;
  weaveTexture.repeat.set(1, 1);
  weaveTexture.offset.set(0, 0);
  weaveTexture.repeat.y *= -1;
  weaveTexture.needsUpdate = true;
  const geo = new THREE.SphereGeometry(0.017, 8, 8);
  const mat = new THREE.MeshBasicMaterial({
    map: weaveTexture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.x = offsetX;
  mesh.position.y = offsetY;
  mesh.position.z = offsetZ;
  mesh.rotation.x = offRotX;
  mesh.rotation.y = offRoty;
  mesh.rotation.z = offRotZ;
  mesh.name = "CapTop";
  return mesh;
}
// ============ Bride ============
function createGuide(offsetX, offsetY, offsetZ, offRotX, offRoty, offRotZ) {
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

  //   class TaperedTubeGeometry extends THREE.BufferGeometry {
  //     constructor(
  //       curve,
  //       tubularSegments,
  //       radiusStart,
  //       radiusEnd,
  //       radialSegments,
  //     ) {
  //       super();
  //       const frames = curve.computeFrenetFrames(tubularSegments, false);
  //       const positions = [];
  //       const indices = [];

  //       for (let i = 0; i <= tubularSegments; i++) {
  //         const t = i / tubularSegments;
  //         // Rayon qui diminue progressivement vers la pointe
  //         const radius = THREE.MathUtils.lerp(radiusStart, radiusEnd, t);
  //         const point = curve.getPoint(t);
  //         const normal = frames.normals[i];
  //         const binormal = frames.binormals[i];

  //         for (let j = 0; j <= radialSegments; j++) {
  //           const angle = (j / radialSegments) * Math.PI * 2;
  //           const sin = Math.sin(angle);
  //           const cos = Math.cos(angle);
  //           positions.push(
  //             point.x + radius * (cos * normal.x + sin * binormal.x),
  //             point.y + radius * (cos * normal.y + sin * binormal.y),
  //             point.z + radius * (cos * normal.z + sin * binormal.z),
  //           );
  //         }
  //       }

  //       // Indices pour les faces
  //       for (let i = 0; i < tubularSegments; i++) {
  //         for (let j = 0; j < radialSegments; j++) {
  //           const a = i * (radialSegments + 1) + j;
  //           const b = (i + 1) * (radialSegments + 1) + j;
  //           indices.push(a, b, a + 1);
  //           indices.push(b, b + 1, a + 1);
  //         }
  //       }

  //       // Génération des UVs
  //       const uvs = [];
  //       for (let i = 0; i <= tubularSegments; i++) {
  //         for (let j = 0; j <= radialSegments; j++) {
  //           uvs.push(i / tubularSegments, j / radialSegments);
  //         }
  //       }
  //       this.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  //       this.setAttribute(
  //         "position",
  //         new THREE.Float32BufferAttribute(positions, 3),
  //       );
  //       this.setIndex(indices);
  //       this.computeVertexNormals();
  //     }
  //   }

  const textureLoader = new THREE.TextureLoader();
  const weaveTexture = textureLoader.load("./img/bois-2.webp");
  weaveTexture.wrapS = THREE.RepeatWrapping;
  weaveTexture.wrapT = THREE.RepeatWrapping;
  weaveTexture.repeat.set(1, 1.5);
  weaveTexture.offset.set(0, 0);
  weaveTexture.repeat.y *= -1;
  weaveTexture.needsUpdate = true;

  const geo = new THREE.TubeGeometry(curve, 100, 0.01, 20, false);
  const mat = new THREE.MeshBasicMaterial({
    map: weaveTexture,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.x = offsetX;
  mesh.position.y = offsetY;
  mesh.position.z = offsetZ;
  mesh.rotation.x = offRotX;
  mesh.rotation.y = offRoty;
  mesh.rotation.z = offRotZ;
  mesh.name = "guide";
  return mesh;
}

//==============================
export function createLugeSport() {
  const lugeGroup = new THREE.Group();
  lugeGroup.name = "luge";

  const chassisGroup = new THREE.Group();
  chassisGroup.name = "chassis";
  //verticale
  chassisGroup.add(createChassis(-0.56, 0.33, 0, 0, 1.57, 0));
  chassisGroup.add(createChassis(-0.49, 0.333, 0, 0, 1.57, 0));
  chassisGroup.add(createChassis(-0.42, 0.335, 0, 0, 1.57, 0));
  chassisGroup.add(createChassis(-0.35, 0.34, 0, 0, 1.57, 0));
  chassisGroup.add(createChassis(-0.27, 0.345, 0, 0, 1.57, 0));
  chassisGroup.add(createChassis(-0.2, 0.35, 0, 0, 1.57, 0));

  //Horizontale
  chassisGroup.add(createChassis(-0.4, 0.34, 0.2, 0, 0, 0.05));
  chassisGroup.add(createChassis(-0.4, 0.34, 0.13, 0, 0, 0.05));
  chassisGroup.add(createChassis(-0.4, 0.34, 0.07, 0, 0, 0.05));
  chassisGroup.add(createChassis(-0.4, 0.34, 0, 0, 0, 0.05));
  chassisGroup.add(createChassis(-0.4, 0.34, -0.07, 0, 0, 0.05));
  chassisGroup.add(createChassis(-0.4, 0.34, -0.13, 0, 0, 0.05));
  chassisGroup.add(createChassis(-0.4, 0.34, -0.2, 0, 0, 0.05));

  const tubeGroupSit = new THREE.Group();
  tubeGroupSit.name = "tubeSit";
  tubeGroupSit.add(createTubeChassisSit(-0.645, 0.25, 0, 1.57, 1.57));
  tubeGroupSit.add(createTubeChassisSit(-0.155, 0.28, 0, 1.57, 1.57));
  const tubeGroupLeft = new THREE.Group();
  tubeGroupLeft.name = "tubeLeft";
  tubeGroupLeft.add(createTubeChassisLeft(-0.65, 0.16, -0.26, 0, 0, 0));
  tubeGroupLeft.add(createTubeChassisLeft(-0.2, 0.16, -0.26, 0, 0, 0));

  const tubeGroupRight = new THREE.Group();
  tubeGroupRight.name = "tubeRight";
  tubeGroupRight.add(createTubeChassisRight(-0.65, 0.16, 0.26, 0.0, 0));
  tubeGroupRight.add(createTubeChassisRight(-0.2, 0.16, 0.26, 0, 0));

  const hoopRight = createTubeHoopRight(0.22, 0.285, 0.24, 1.57, 0, 3.13);
  const hoopLeft = createTubeHoopLeft(0.22, 0.285, -0.24, -1.57, 0, 3.13);

  const patinsRight = createPatinRight(0.36, 0.2);
  const patinsLeft = createPatinLeft(-0.36, 0.2);

  const capGroupBtm = new THREE.Group();
  capGroupBtm.name = "CapBottom";
  capGroupBtm.add(createCapBottom(-0.8, 0.08, 0.26, 0, 0, 0));
  capGroupBtm.add(createCapBottom(-0.8, 0.08, -0.26, 0, 0, 0));
  const capGroupTop = new THREE.Group();
  capGroupTop.name = "CapTop";
  capGroupTop.add(createCapTop(0.63, 0.475, 0.16, 0, 0, 0));
  capGroupTop.add(createCapTop(0.63, 0.475, -0.16, 0, 0, 0));

  const capGroupBtmHoop = new THREE.Group();
  capGroupBtm.name = "CapBottomHoop";
  capGroupBtm.add(createCapBottomHoop(-0.73, 0.235, 0.23, 0, 0, 0));
  capGroupBtm.add(createCapBottomHoop(-0.73, 0.235, -0.23, 0, 0, 0));
  const capGroupTopHoop = new THREE.Group();
  capGroupTop.name = "CapTopHoop";
  capGroupTop.add(createCapTopHoop(0.7, 0.33, 0.184, 0, 0, 0));
  capGroupTop.add(createCapTopHoop(0.7, 0.33, -0.184, 0, 0, 0));

  const guideGroup = new THREE.Group();
  guideGroup.name = "guide";
  guideGroup.add(createGuide(-0.03, 0.2, 0.52, -1.57, 0, -0.1));
  guideGroup.add(createGuide(-0.03, 0.5, -0.52, 1.57, 0, -0.1));

  lugeGroup.add(chassisGroup);
  lugeGroup.add(tubeGroupSit);
  lugeGroup.add(tubeGroupLeft);
  lugeGroup.add(tubeGroupRight);
  lugeGroup.add(hoopRight);
  lugeGroup.add(hoopLeft);
  lugeGroup.add(patinsRight);
  lugeGroup.add(patinsLeft);
  lugeGroup.add(capGroupBtm);
  lugeGroup.add(capGroupTop);
  lugeGroup.add(guideGroup);
  return lugeGroup;
}
