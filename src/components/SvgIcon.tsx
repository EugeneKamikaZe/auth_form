import React from 'react';
import cn from "classnames";

interface ISvgProps {
    icon: any,
    label?: string,
    svgClassName?: string,
    svgColor?: string,
    height?: number,
    width?: number,
}

const SvgIcon: React.FC<ISvgProps> = ({
                                          icon,
                                          svgClassName = ('icon-' + icon),
                                          svgColor = 'white',
                                          label,
                                          height,
                                          width,
                                      }) => {
    return (
        <svg
            className={cn('icon',
                svgClassName && ' ' + svgClassName,
                svgColor && 'icon__' + svgColor,
                height && `h-${height}`,
                width && `w-${width}`,
                )}
            aria-label={label}
        >
            <use xlinkHref={`#sprite_svg__icon-${icon}`}/>
        </svg>
    );
};

export default SvgIcon;
