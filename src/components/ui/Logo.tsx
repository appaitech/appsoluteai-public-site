import { useTheme } from '@/hooks/useTheme';
import logoDark from '../../assets/logo-dark.svg';
import logoLight from '../../assets/logo-light.svg';

interface LogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const Logo = ({ className = '', width = 120, height = 40 }: LogoProps) => {
  const { isDarkMode } = useTheme();

  return (
    <img
      src={isDarkMode ? logoDark : logoLight}
      alt="AppsoluteAI Logo"
      className={`transition-opacity duration-200 ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
};

export default Logo; 