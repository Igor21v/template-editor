import { memo, useState } from "react";
import cls from "./TemplateEditor.module.css";
import { classNames } from "shared/lib/classNames/classNames";
import { TextAreaAutosize } from "shared/ui/TextAreaAutosize";
import { Card } from "shared/ui/Card";
import { HStack, VStack } from "shared/ui/Stack";
import { Text } from "shared/ui/Text";
import { Button } from "shared/ui/Button";
import { TemplatePreview } from "../TemplatePreview/TemplatePreview";
import { EditorBlock } from "../EditorBlock/EditorBlock";

interface TemplateEditorProps {
  className?: string;
  closeHandler: () => void;
  saveHandler: () => void;
}

export const TemplateEditor = memo((props: TemplateEditorProps) => {
  const { className, closeHandler, saveHandler } = props;
  const [isPreview, setIsPreview] = useState(false);
  const onClosePreview = () => {
    setIsPreview(false);
  };
  const onShowPreview = () => {
    setIsPreview(true);
  };

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
        <EditorBlock />
      </Card>
      <HStack max justify="center" gap="64">
        <Button onClick={onShowPreview}>Preview</Button>
        <Button theme="outlineGreen" onClick={saveHandler}>
          Save
        </Button>
        <Button theme="outlineRed" onClick={closeHandler}>
          Close
        </Button>
      </HStack>
      {isPreview && (
        <TemplatePreview onClose={onClosePreview} isOpen={isPreview} />
      )}
    </VStack>
  );
});
