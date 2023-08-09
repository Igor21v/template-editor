import { memo } from "react";
import cls from "./MainPage.module.css";
import { classNames } from "shared/lib/classNames/classNames";
import { TemplateEditor } from "widgets/TemplateEditor";

interface MainPageProps {
  className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
  const { className } = props;

  return (
    <div className={classNames(cls.MainPage, {}, [className])}>
      <TemplateEditor />
    </div>
  );
});
