import type { SVGProps } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  icon: IconDefinition;
  /** Accessible label. When omitted the SVG is marked aria-hidden. */
  title?: string;
  /** Edge-to-edge size in `em` units (default 1em — inherits surrounding font size). */
  size?: string | number;
}

/**
 * Renders a FontAwesome `IconDefinition` as inline SVG.
 *
 * Importing icons from per-icon entry points (e.g.
 * `@fortawesome/free-brands-svg-icons/faGithub`) means we ship only the path
 * data we use — no `@fortawesome/react-fontawesome` runtime, no `all.js`, no
 * 2.8k SVGs in `static/`. The component is server-renderable; the SVG path is
 * inlined in the initial HTML.
 */
export function Icon({
  icon,
  title,
  size = "1em",
  className,
  ...rest
}: IconProps) {
  const [width, height, , , path] = icon.icon;
  const pathData = Array.isArray(path) ? path.join(" ") : path;
  const ariaProps = title ? { role: "img", "aria-label": title } : { "aria-hidden": true };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width={size}
      height={size}
      className={className}
      focusable={false}
      {...ariaProps}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path fill="currentColor" d={pathData} />
    </svg>
  );
}
