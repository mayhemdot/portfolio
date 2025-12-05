/** biome-ignore-all lint/complexity/noUselessFragments: <explanation> */
import type * as React from "react";

function H1Horizontal(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  const { className } = props;
  return (
    <>
      <picture className={className}>
        {/* Для десктопа */}
        <source srcSet="/h1-desktop.svg" media="(min-width: 1024px)" className="w-full" />
        {/* Для мобильных устройств по умолчанию */}
        <img src="/h1-mobile.svg" width="100%" alt={"Adaptive SVG"} className="w-full" />
      </picture>
    </>
  );
}

export default H1Horizontal;
