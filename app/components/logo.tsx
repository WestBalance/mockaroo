// components/logo.tsx
import { FC, SVGProps } from 'react';

interface LogoProps extends SVGProps<SVGSVGElement> {
    className?: string;
}

export const Logo: FC<LogoProps> = ({ className = "w-8 h-8", ...props }) => {
    return (
        <svg
            className={className}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M6 8L12 4L18 8L18 20L12 24L6 20L6 8Z"
                stroke="#67e8f9"
                strokeWidth="1.5"
                fill="none"
            />
            <path
                d="M9 12L15 16"
                stroke="#67e8f9"
                strokeWidth="1"
                strokeDasharray="2 2"
            />
            <path
                d="M12 8V20"
                stroke="#67e8f9"
                strokeWidth="1"
            />
            <circle cx="12" cy="12" r="1" fill="#67e8f9" />
            <circle cx="9" cy="14" r="0.8" fill="#67e8f9" />
            <circle cx="15" cy="18" r="0.8" fill="#67e8f9" />
        </svg>
    );
};