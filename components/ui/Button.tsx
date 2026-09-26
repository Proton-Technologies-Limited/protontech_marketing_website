import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "beam" | "solid" | "outline" | "white";

type BaseProps = {
  children: string;
  variant?: Variant;
  size?: "md" | "sm";
  icon?: "arrow" | "down";
  className?: string;
};

type AnchorProps = BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "children" | "className" | "href">;
type NativeButtonProps = BaseProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "children" | "className">;

function Arrow({ down }: { down?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={down ? { rotate: "90deg" } : undefined}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Inner({ children, icon }: { children: string; icon: BaseProps["icon"] }) {
  const down = icon === "down";
  return (
    <>
      <span className="btn__fill" aria-hidden="true" />
      <span className="btn__label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      <span className="btn__icon" aria-hidden="true">
        <Arrow down={down} />
        <Arrow down={down} />
      </span>
    </>
  );
}

/**
 * Pill button with a fill wipe, rolling label and sliding arrow.
 * Renders an <a> when `href` is set, otherwise a <button>.
 */
export function Button(props: AnchorProps | NativeButtonProps) {
  const { children, variant = "solid", size = "md", icon = "arrow", className, ...rest } = props;
  const classes = cn("btn", `btn--${variant}`, size === "sm" && "btn--sm", className);

  if (props.href !== undefined) {
    return (
      <a className={classes} {...(rest as Omit<AnchorProps, keyof BaseProps>)}>
        <Inner icon={icon}>{children}</Inner>
      </a>
    );
  }

  const { type = "button", ...buttonRest } = rest as Omit<NativeButtonProps, keyof BaseProps>;
  return (
    <button type={type} className={classes} {...buttonRest}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}
