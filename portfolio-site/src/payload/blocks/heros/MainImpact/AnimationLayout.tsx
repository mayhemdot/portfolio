// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import React, { Suspense } from "react";
// import { CAMERA_CONFIG, type CameraPose, Scene } from "./Scene3d";

// export function AnimationLayout({ children }: { children: React.ReactNode }) {
// 	const heroRef = React.useRef<HTMLDivElement>(null);
// 	const heroContentRef = React.useRef<HTMLDivElement>(null);
// 	const heroLeftRef = React.useRef<HTMLDivElement>(null);
// 	const heroRightRef = React.useRef<HTMLDivElement>(null);
// 	const cameraStateRef = React.useRef<CameraPose>({
// 		...CAMERA_CONFIG.desktop.start,
// 	});

// 	useGSAP(
// 		() => {
// 			// ScrollTrigger camera fly-through timeline
// 			const isMobile = window.innerWidth < 768;
// 			const config = isMobile ? CAMERA_CONFIG.mobile : CAMERA_CONFIG.desktop;

// 			cameraStateRef.current = { ...config.start };

// 			const dissolveTargets = [
// 				heroContentRef.current,
// 				heroLeftRef.current,
// 				heroRightRef.current,
// 			].filter(Boolean);

// 			// Set initial states for performance & crispness
// 			gsap.set(dissolveTargets, {
// 				opacity: 1,
// 				filter: "blur(0px)",
// 				willChange: "filter, opacity",
// 				pointerEvents: "auto",
// 				// pinReparent: true,
// 				// pinSpacing: false,
// 			});

// 			const scrollTl = gsap.timeline({
// 				scrollTrigger: {
// 					trigger: document.documentElement,
// 					start: "top top",
// 					end: "+=150%",
// 					pin: heroRef.current,
// 					scrub: 1,
// 					anticipatePin: 1,
// 					invalidateOnRefresh: true,
// 				},
// 			});

// 			const TOTAL_DURATION = 2.0;

// 			scrollTl
// 				.to(cameraStateRef.current, {
// 					x: config.mid.x,
// 					y: config.mid.y,
// 					z: config.mid.z,
// 					rotX: config.mid.rotX,
// 					rotY: config.mid.rotY,
// 					rotZ: config.mid.rotZ,
// 					fov: config.mid.fov,
// 					duration: 1,
// 					ease: "power1.inOut",
// 				})
// 				.to(cameraStateRef.current, {
// 					x: config.end.x,
// 					y: config.end.y,
// 					z: config.end.z,
// 					rotX: config.end.rotX,
// 					rotY: config.end.rotY,
// 					rotZ: config.end.rotZ,
// 					fov: config.end.fov,
// 					duration: 1,
// 					ease: "power1.inOut",
// 				})
// 				.to(
// 					dissolveTargets,
// 					{
// 						opacity: 0,
// 						filter: "blur(8px)",
// 						duration: TOTAL_DURATION * 0.3, // Last 30% of scroll timeline
// 						ease: "power2.in",
// 						onComplete: () => {
// 							gsap.set(dissolveTargets, { pointerEvents: "none" });
// 						},
// 						onReverseComplete: () => {
// 							gsap.set(dissolveTargets, { pointerEvents: "auto" });
// 						},
// 					},
// 					TOTAL_DURATION * 0.7, // Starts at 70% progress
// 				);
// 		},
// 		{ scope: heroRef },
// 	);

// 	// return <>{children}</>;

// 	return (
// 		<div
// 			ref={heroRef}
// 			id="home"
// 			className="relative flex h-[100dvh] items-stretch shrink-0 justify-center df-px-xs"
// 		>
// 			{/* heightWithoutHeader */}
// 			{children}
// 			<Suspense
// 				fallback={
// 					<div className="max-w-full w-full h-[calc(100vh+80px)]! absolute! -mt-20 -z-1"></div>
// 				}
// 			>
// 				<Scene cameraStateRef={cameraStateRef} />
// 			</Suspense>
// 		</div>
// 	);
// }
