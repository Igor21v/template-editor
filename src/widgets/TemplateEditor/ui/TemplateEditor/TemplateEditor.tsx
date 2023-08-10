import { memo } from "react";
import cls from "./TemplateEditor.module.css";
import { classNames } from "shared/lib/classNames/classNames";
import { TextAreaAutosize } from "shared/ui/TextAreaAutosize";
import { Card } from "shared/ui/Card";
import { HStack, VStack } from "shared/ui/Stack";
import { Text } from "shared/ui/Text";
import { Button } from "shared/ui/Button";
import { TabItem, Tabs } from "shared/ui/Tabs";

interface TemplateEditorProps {
  className?: string;
  closeHandler: () => void;
}

export const TemplateEditor = memo((props: TemplateEditorProps) => {
  const { className, closeHandler } = props;

  return (
    <VStack
      align="center"
      className={classNames(cls.TemplateEditor, {}, [className])}
      max
      gap="16"
    >
      <Text
        title="Message Template Editor"
        align="center"
        className={cls.title}
      />
      <HStack max justify="between" align="center">
        <HStack gap="8">
          <Button theme="backgroundInverted">{"{firstname}"}</Button>
          <Button theme="backgroundInverted">{"{lastname}"}</Button>
          <Button theme="backgroundInverted">{"{company}"}</Button>
          <Button theme="backgroundInverted">{"{position}"}</Button>
        </HStack>
        <Button theme="backgroundInverted" size="size_m">
          Click to add IF-THEN-ELSE block
        </Button>
      </HStack>

      <Card max className={cls.card}>
        <TextAreaAutosize />
      </Card>
      <HStack max justify="around">
        <Button>Preview</Button>
        <Button theme="outlineGreen" onClick={closeHandler}>
          Save
        </Button>
        <Button theme="outlineRed" onClick={closeHandler}>
          Close
        </Button>
      </HStack>
    </VStack>
  );
});
