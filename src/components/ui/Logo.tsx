import React from 'react';
import logoDark from "../../assets/logo-dark.png";
import logoLight from "../../assets/logo-dark.png"; // Temporarily using dark logo for both until light logo is added

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "", width = 120, height = 40 }) => {
  return (
    <picture>
      <source srcSet={logoLight} media="(prefers-color-scheme: dark)" />
      <img
        src={logoDark}
        alt="Appsolute AI Logo"
        width={width}
        height={height}
        className={className}
      />
    </picture>
  );
};

export default Logo; 