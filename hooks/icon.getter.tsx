import React, { ReactElement, useEffect, useState } from "react";

/**
 * The component was created for not to be necessary to import all icons inside a React file.
 *
 * @interface IGetIconProps
 * @param {string} icon - Name of the SVG (.tsx) file.
 */

interface IGetIconProps {
  icon?: string;
  svgProps?: object;
  onClick ?: (e: React.MouseEvent<HTMLElement>) => void
}

const Icon: React.FC<IGetIconProps> = (props) => {
  
  const { icon, svgProps, onClick } = props;

  const [IconComponent, setIconComponent] = useState<ReactElement>(<></>);

  useEffect(() => {
    async function importAsynchronouslyIcon() {
      try {
        const { default: SelectedIcon } = await import(
          `@assets/svgs/${icon}`
        );

        const iconWithProps = <SelectedIcon {...svgProps} onClick={onClick} />;

        setIconComponent(iconWithProps);
      } catch (error) {
        console.error(`The icon '${icon}' was not added in components/Icons` + error);
      }
    }

    icon && importAsynchronouslyIcon();
  }, [icon, svgProps]);

  return IconComponent;
};

export default Icon;