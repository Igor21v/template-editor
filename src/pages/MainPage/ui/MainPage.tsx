import { memo, useState } from "react";
import cls from "./MainPage.module.css";
import { classNames } from "shared/lib/classNames/classNames";
import { TemplateEditor } from "widgets/TemplateEditor";
import { Button } from "shared/ui/Button";
import { VStack } from "shared/ui/Stack";
import { resolve } from "path";

interface MainPageProps {
  className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
  const { className } = props;
  const [templIsOpen, setTemplIsOpen] = useState(true);
  const saveHandler = async () => {
    await new Promise((resolve) =>
      setTimeout(() => console.log("Saved"), 1000)
    );
  };

  if (templIsOpen) {
    return (
      <div className={classNames(cls.MainPage, {}, [className])}>
        <TemplateEditor
          closeHandler={() => setTemplIsOpen(false)}
          saveHandler={saveHandler}
        />
      </div>
    );
  }
  return (
    <VStack
      align="center"
      max
      justify="center"
      className={classNames(cls.MainPage, {}, [className])}
    >
      <Button onClick={() => setTemplIsOpen(true)}>Message Editor</Button>
    </VStack>
  );
});
