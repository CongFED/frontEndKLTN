import React, { useEffect, useRef } from "react";
interface Props {
  index: number;
  images: string;
  className: string;
}
const LazyLoadImg = ({ index, images, className }: Props) => {
  const imgRef = useRef();
  useEffect(() => {
    const img = imgRef.current;
    // if (!img) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        img.setAttribute("src", img.alt);
      }
    });
    if (img) observer.observe(img);

    return () => {
      if (img) observer.unobserve(img);
    };
  }, []);
  return (
    <img
      key={index}
      // src={images[item]?.linkImage}
      alt={images}
      className={className}
      ref={imgRef}
    />
  );
};

export default LazyLoadImg;
