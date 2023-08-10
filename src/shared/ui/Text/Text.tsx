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
  card?: boolean;
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
    card,
  } = props;

  const additional = [className, cls[theme], cls[align], cls[size]];
  const mods = {
    [cls.italic]: italic,
    [cls.minLineHeight]: minLineHeight,
    [cls.card]: card,
  };
  return (
    <div className={classNames("", mods, additional)}>
      {title && (
        <HeaderTag className={classNames(cls.title, {}, [classNameTitle])}>
          {title}
        </HeaderTag>
      )}
      {text && (
        <p className={classNames(cls.text, {}, [classNameText])}>{text}</p>
      )}
    </div>
  );
});
