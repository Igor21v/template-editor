import { memo } from "react";
import cls from "./TemplatePreview.module.scss";
import { classNames } from "shared/lib/classNames/classNames";

interface TemplatePreviewProps {
  className?: string;
}

export const TemplatePreview = memo((props: TemplatePreviewProps) => {
  const { className } = props;

  return (
    <div className={classNames(cls.TemplatePreview, {}, [className])}></div>
  );
});
