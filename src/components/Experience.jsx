import {
  CameraControls,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { useChat } from "../hooks/useChat";
import { useAvatar } from "../hooks/useAvatar";
import { Avatar } from "./Avatar";
import { Dots } from "./Dots";

export const Experience = () => {
  const cameraControls = useRef();
  const { cameraZoomed } = useChat();
  const { showAvatar } = useAvatar();

  useEffect(() => {
    cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0);
  }, []);

  useEffect(() => {
    if (cameraZoomed) {
      cameraControls.current.setLookAt(0, 1.5, 1.5, 0, 1.5, 0, true);
    } else {
      cameraControls.current.setLookAt(0, 2.2, 5, 0, 1.0, 0, true);
    }
  }, [cameraZoomed]);

  return (
    <>
      <CameraControls ref={cameraControls} />
      <Environment preset="sunset" />
      {showAvatar && (
        <Suspense>
          <Avatar position={[0, 1, -0.5]} scale={0.5} />
          <Dots position-y={1.0} position-x={-0.02} />
        </Suspense>
      )}
      <ContactShadows opacity={0.7} scale={10} blur={3.5} />
    </>
  );
};