"use client";

import { Canvas } from "@react-three/fiber";
import { type PropsWithChildren, Suspense, useRef } from "react";
import { useMediaQuery } from "@/shared/utils/useMediaQuery";
import { KtxKnife2 } from "./KTXKnife";

// import { LocalizedClientButton } from "@modules/common/components/localized-client-link"
// import { SlideDown, SlideUp } from "@/modules/home/components/hero/animations"
// import { KtxKnife2 } from "@/modules/home/scene/KtxKnife2"

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function SceneContext({ children }: PropsWithChildren) {
  const pointLightRef = useRef<any>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const cameraDistance = isMobile ? 2.7 : 2;

  return (
    <>
      {children}
      <Canvas
        style={{
          width: "100%",
          maxWidth: "100%",
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          overflow: "hidden",
          pointerEvents: "auto",
          // pointerEvents: "none",
          zIndex: 1,
        }}
        shadows
        dpr={[1, 1.2]}
        gl={{
          antialias: false,
          powerPreference: "default", // "high-performance" может вызывать проблемы
          alpha: true,
          stencil: false,
          depth: true,
        }}
        camera={{
          fov: 60,
          near: 0.5,
          far: 1500,
          position: [0, cameraDistance, 0.5],
        }}
        onPointerDown={(e) => {
          // Выводим координаты события, как они приходят от браузера
          console.log("PointerDown событие:", e.clientX, e.clientY);

          // Получаем размеры canvas-а (а также его позицию на странице)
          const canvasRect = (e.target as HTMLCanvasElement)?.getBoundingClientRect();
          if (!canvasRect) return;

          // Вычисляем координаты относительно canvas-а
          const xInCanvas = e.clientX - canvasRect.left;
          const yInCanvas = e.clientY - canvasRect.top;
          console.log("Координаты в canvas:", xInCanvas, yInCanvas);

          // Преобразуем их в нормализованные координаты (NDC) для Three.js:
          // NDC по оси X: от -1 до 1, где 0 — середина canvas-а.
          // NDC по оси Y: от -1 до 1, Y инвертирован (верх — 1, низ — -1)
          const ndcX = (xInCanvas / canvasRect.width) * 2 - 1;
          const ndcY = -(yInCanvas / canvasRect.height) * 2 + 1;
          console.log("Нормализованные координаты (NDC):", ndcX, ndcY);
        }}
      >
        <Suspense fallback={null}>
          <pointLight position={[0.4, 0.98, 0]} ref={pointLightRef} intensity={4} />
          {/* Блин над лезвием */}
          <pointLight position={[-0.44, 0.04, 0]} intensity={1} color="white" />
          {/* Острие */}
          <pointLight position={[-1.2, 0.92, 0.56]} intensity={1} color="white" />
          {/* Левый свет */}
          <pointLight position={[0.72, 0, -0.36]} intensity={1} color="white" />
          {/* <KnifeModel /> */}
          {/* <GlbKnife rotation={{ x: 0, y: -Math.PI / 4, z: 0 }} /> */}

          <KtxKnife2 />
        </Suspense>
      </Canvas>
    </>
  );
}
