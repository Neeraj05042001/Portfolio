import { Suspense } from "react";
import HackerRoom from "../3D Components/HackerRoom";
import CanvasLoader from "../3D Components/CanvasLoader";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import { Leva, useControls } from "leva";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../Constants";
import Target from "../3D Components/Target";
import ReactLogo from "../3D Components/ReactLogo";
import Cube from "../3D Components/Cube";
import Rings from "../3D Components/Rings";
import HeroCamera from "../3D Components/HeroCamera";
import Button from "./Button";

const Hero = () => {
  // const controls = useControls(schemaOrFolderName: 'HackerRoom', settingsOrDepsOrSchema:{rotationX:{value:2.5, min: -10, max:10,}})
  // const controls = useControls("HackerRoom", {
  //   positionX: { value: 2.5, min: -10, max: 10 },
  //   positionY: { value: 2.5, min: -10, max: 10 },
  //   positionZ: { value: 2.5, min: -10, max: 10 },
  //   rotationX: { value: 0, min: -10, max: 10 },
  //   rotationY: { value: 0, min: -10, max: 10 },
  //   rotationZ: { value: 0, min: -10, max: 10 },
  //   scale: { value: 1, min: 0.1, max: 10 },
  // });
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);
  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3 ">
        <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
          Hi, I am Neeraj <span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient">
          Building Products & Brands
        </p>
      </div>

      <div className="w-full h-full absolute inset-0  ">
        {/* <Leva /> */}
        <Canvas className="w-full h-full">
          {/* Adding Camera */}
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 20]} />
            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                // scale={0.07}
                // position={[2, x.positionY, x.positionZ]}
                // rotation={[x.rotationX, x.rotationY, x.rotationZ]}
                // scale={[x.scale, x.scale, x.scale]}
                position={sizes.deskPosition}
                scale={sizes.deskScale}
                rotation={[0, -Math.PI, 0]}
              />
            </HeroCamera>

            <group>
              <Target position={sizes.targetPosition} />
              <ReactLogo position={sizes.reactLogoPosition} />
              <Cube position={sizes.cubePosition} />
              <Rings position={sizes.ringPosition} />
            </group>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>

        <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
          <a href="#contact" className="w-fit">
            <Button
              name="Let's Work Together"
              isBeam
              containerClass="sm:w-fit w-full sm:min-w-96"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
