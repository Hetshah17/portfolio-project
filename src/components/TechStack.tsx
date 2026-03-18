import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

type TechTextureConfig = {
  label: string;
  bg: string;
  fg: string;
};

const TECH_TEXTURES: TechTextureConfig[] = [
  { label: "Python", bg: "#3776AB", fg: "#FFFFFF" },
  { label: "FastAPI", bg: "#009688", fg: "#FFFFFF" },
  { label: "Flask", bg: "#000000", fg: "#FFFFFF" },
  { label: "GraphQL", bg: "#E10098", fg: "#FFFFFF" },
  { label: "PostgreSQL", bg: "#336791", fg: "#FFFFFF" },
  { label: "SQLAlchemy", bg: "#8B0000", fg: "#FFFFFF" },
  { label: "REST APIs", bg: "#4F46E5", fg: "#FFFFFF" },
  { label: "Microservices", bg: "#06B6D4", fg: "#FFFFFF" },
  { label: "Multitenancy", bg: "#F59E0B", fg: "#1F2937" },
  { label: "Node.js", bg: "#16a34a", fg: "#FFFFFF" },
  { label: "Express", bg: "#374151", fg: "#FFFFFF" },
  { label: "React", bg: "#2563eb", fg: "#FFFFFF" },
  { label: "MongoDB", bg: "#059669", fg: "#FFFFFF" },
  { label: "Machine Learning", bg: "#7C3AED", fg: "#FFFFFF" },
  { label: "Power BI", bg: "#F01F3A", fg: "#FFFFFF" },
  { label: "AWS S3", bg: "#FF9900", fg: "#1F2937" },
];

function createTextTexture(label: string, bg: string, fg: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create 2D canvas context");

  // Background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle vignette
  const grad = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    20,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 1.1
  );
  grad.addColorStop(0, "rgba(255,255,255,0.12)");
  grad.addColorStop(1, "rgba(0,0,0,0.35)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Text (wrap words to fit)
  ctx.fillStyle = fg;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const maxWidth = 420;
  const words = label.split(" ");
  let lines: string[] = [];

  const fontFamily =
    "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";
  const baseFontSize = 62;

  // Find a font size that allows the text block to fit.
  let fontSize = baseFontSize;
  for (; fontSize >= 28; fontSize -= 2) {
    lines = [];
    let current = "";

    for (const w of words) {
      const test = current ? `${current} ${w}` : w;
      ctx.font = `700 ${fontSize}px ${fontFamily}`;

      if (ctx.measureText(test).width <= maxWidth) {
        current = test;
      } else {
        if (current) lines.push(current);
        current = w;
      }
    }

    if (current) lines.push(current);

    const totalHeight = lines.length * fontSize * 0.98;
    if (totalHeight <= 420) break;
  }

  ctx.font = `800 ${fontSize}px ${fontFamily}`;
  const totalHeight = lines.length * fontSize * 0.98;
  const startY = canvas.height / 2 - totalHeight / 2 + fontSize / 2;

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], canvas.width / 2, startY + i * fontSize * 0.98);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const textures = useMemo(
    () => TECH_TEXTURES.map((t) => createTextTexture(t.label, t.bg, t.fg)),
    []
  );

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          // Emissive gives a slight glow so the text stays visible.
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.28,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, [textures]);

  return (
    <div className="techstack">
      <h2>My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[Math.floor(Math.random() * materials.length)]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
