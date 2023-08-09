import { memo } from "react";
import cls from "./TemplateEditor.module.css";
import { classNames } from "shared/lib/classNames/classNames";
import { TextAreaAutosize } from "shared/ui/TextAreaAutosize";

interface TemplateEditorProps {
  className?: string;
}

export const TemplateEditor = memo((props: TemplateEditorProps) => {
  const { className } = props;

  return (
    <div className={classNames(cls.TemplateEditor, {}, [className])}>
      <TextAreaAutosize />
    </div>
  );
});
