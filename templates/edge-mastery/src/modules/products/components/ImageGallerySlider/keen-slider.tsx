// "use client";

// import Image from "next/image";
// import "keen-slider/keen-slider.min.css";
// import { useKeenSlider } from "keen-slider/react";
// import { useState } from "react";

// function ImageGallerySlider({ images }: { images: HttpTypes.StoreProductImage[] }) {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
//     initial: 0,
//     slideChanged(slider) {
//       setCurrentSlide(slider.track.details.rel);
//     },
//     created() {
//       setLoaded(true);
//     },
//   });

//   const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
//     {
//       initial: 0,
//       slides: {
//         perView: 3,
//         spacing: 10,
//       },
//       vertical: window && window.matchMedia("(min-width: 768px)").matches,
//     },
//     [
//       (slider: any) => {
//         let timeout: ReturnType<typeof setTimeout>;
//         let mouseOver = false;
//         function clearNextTimeout() {
//           clearTimeout(timeout);
//         }
//         function nextTimeout() {
//           clearTimeout(timeout);
//           if (mouseOver) return;
//           timeout = setTimeout(() => {
//             slider.next();
//           }, 2000);
//         }
//         slider.on("created", () => {
//           slider.container.addEventListener("mouseover", () => {
//             mouseOver = true;
//             clearNextTimeout();
//           });
//           slider.container.addEventListener("mouseout", () => {
//             mouseOver = false;
//             nextTimeout();
//           });
//           nextTimeout();
//         });
//         slider.on("dragStarted", clearNextTimeout);
//         slider.on("animationEnded", nextTimeout);
//         slider.on("updated", nextTimeout);
//       },
//     ],
//   );

//   // const imageRefs = useRef<any[]>([])

//   // const handleThumbnailClick = (index: number) => {
//   //   imageRefs.current[index]?.scrollIntoView({
//   //     behavior: "smooth",
//   //     block: "center",
//   //   })
//   // }
//   // const [thumbsSwiper, setThumbsSwiper] = useState(null)

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-6 gap-4 lg:gap-8 relative">
//       <div className="md:col-span-1 order-2 overflow-x-auto md:order-1 flex flex-row gap-3 md:flex-col md:space-y-2 h-fit shrink-0">
//         {[...images, ...images, ...images, ...images].map((image, index) => {
//           return (
//             <Image
//               onClick={() => instanceRef.current?.moveToIdx(index)}
//               key={`image-thumbnail-${image.id}`}
//               src={image.url}
//               height={120}
//               width={120}
//               alt=""
//               className="rounded-xl"
//               style={{
//                 backgroundBlendMode: "inherit",
//               }}
//               sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
//             />
//           );
//         })}
//         {/* <div ref={thumbnailRef} className="keen-slider vertical h-[400px]">
//           {images.map((image, idx) => (
//             <div
//               key={idx}
//               className="keen-slider__slide cursor-pointer aspect-square "
//             >
//               <Image
//                 src={image.url}
//                 alt={`Product thumbnail ${idx + 1}`}
//                 width={100}
//                 height={100}
//                 className="object-cover w-full h-full"
//                 onClick={() => instanceRef.current?.moveToIdx(idx)}
//               />
//             </div>
//           ))}
//         </div> */}
//         {/* <div
//           ref={thumbnailRef}
//           className="keen-slider shrink-0 horizontal lg:vertical"
//         >
//           {images.map((image, idx) => (
//             <div key={idx} className="keen-slider__slide cursor-pointer ">
//               <Image
//                 src={image.url}
//                 alt={`Product thumbnail ${idx + 1}`}
//                 width={100}
//                 height={100}
//                 className="object-cover shrink-0 w-[100px]"
//                 onClick={() => instanceRef.current?.moveToIdx(idx)}
//               />
//             </div>
//           ))}
//         </div> */}
//       </div>
//       <div className="md:col-span-5 order-1 md:order-2 relative">
//         <div ref={sliderRef} className="keen-slider aspect-[9/11] min-w-full">
//           {images.map((image, idx) => (
//             <div key={idx} className="keen-slider__slide shrink-0">
//               <Image
//                 src={image.url}
//                 alt={`Product image ${idx + 1}`}
//                 width={600}
//                 height={600}
//                 className="object-contain w-full h-full"
//               />
//             </div>
//           ))}
//         </div>
//         {/* {loaded && instanceRef.current && (
//           <div className="flex justify-center mt-4">
//             {[...Array(instanceRef.current.track.details.slides.length)].map(
//               (_, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => instanceRef.current?.moveToIdx(idx)}
//                   className={`size-3 rounded-full mx-1 ${
//                     currentSlide === idx ? "bg-blue-500" : "bg-gray-300"
//                   }`}
//                 ></button>
//               )
//             )}
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// }

// export default ImageGallerySlider;
