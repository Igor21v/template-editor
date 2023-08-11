import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Text.module.css";

export enum TextTheme {
  PRIMARY = "primary",
  INVERTED = "inverted",
  ERROR = "error",
  SUCCESS = "success",
  BRIGHT = "bright",
  INVERTED_BRIGHT = "inverted_bright",
}

type TextAlign = "right" | "left" | "center";

export enum TextSize {
  S = "size_s",
  M = "size_m",
  L = "size_l",
}

type HeaderTagType = "h1" | "h2" | "h3" | "p";

export interface TextProps {
  className?: string;
  classNameTitle?: string;
  classNameText?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
  HeaderTag?: HeaderTagType;
  italic?: boolean;
  minLineHeight?: boolean;
  badge?: boolean;
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
    align = "left",
    size = TextSize.M,
    HeaderTag = "p",
    italic,
    classNameTitle,
    classNameText,
    minLineHeight,
    badge,
  } = props;

  const additional = [className, cls[theme], cls[align], cls[size]];
  const mods = {
    [cls.italic]: italic,
    [cls.minLineHeight]: minLineHeight,
  };
  return (
    <div className={classNames("", mods, additional)}>
      {title && (
        <HeaderTag className={classNames(cls.title, {}, [classNameTitle])}>
          {title}
        </HeaderTag>
      )}
      {text && (
        <p
          className={classNames(cls.text, { [cls.badge]: badge }, [
            classNameText,
          ])}
        >
          {text}
        </p>
      )}
    </div>
  );
});
