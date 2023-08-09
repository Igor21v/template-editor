import { memo } from "react";
import cls from "./TemplateEditor.module.css";
import { classNames } from "shared/lib/classNames/classNames";
import { TextAreaAutosize } from "shared/ui/TextAreaAutosize";
import { Card } from "shared/ui/Card";
import { VStack } from "shared/ui/Stack";
import { Text } from "shared/ui/Text";

interface TemplateEditorProps {
  className?: string;
}

export const TemplateEditor = memo((props: TemplateEditorProps) => {
  const { className } = props;

  return (
    <VStack
      align="center"
      className={classNames(cls.TemplateEditor, {}, [className])}
      max
      gap="16"
    >
      <Text
        title="Редактор шаблонов сообщений"
        align="center"
        className={cls.title}
      />
      <Card max className={cls.card}>
        <TextAreaAutosize />
      </Card>
    </VStack>
  );
});
