import { useEffect, useState } from "react";

// Для реализации логики, при которой header исчезает при прокрутке
// вниз и появляется при прокрутке вверх, можно написать хук
export const useScrollValue = () => {
  const [scrollValue, setScrollValue] = useState(0); // Текущее значение скролла
  const [isScrollingUp, setIsScrollingUp] = useState(false); // Прокрутка вверх или вниз

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Определяем направление прокрутки
      if (currentScrollY > lastScrollY) {
        setIsScrollingUp(false); // Прокрутка вниз
      } else {
        setIsScrollingUp(true); // Прокрутка вверх
      }

      // Обновляем значение прокрутки
      setScrollValue(currentScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollValue, isScrollingUp };
};
