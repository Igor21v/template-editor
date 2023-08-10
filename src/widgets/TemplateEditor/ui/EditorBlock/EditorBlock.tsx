import { memo } from "react";
import cls from "./EditorBlock.module.css";
import { classNames } from "shared/lib/classNames/classNames";
import { VStack } from "shared/ui/Stack";
import { TextAreaAutosize } from "shared/ui/TextAreaAutosize";

interface EditorBlockProps {
  className?: string;
}

export const EditorBlock = memo((props: EditorBlockProps) => {
  const { className } = props;

  return (
    <VStack gap="8">
      <TextAreaAutosize />
      <TextAreaAutosize />
      <TextAreaAutosize />
      <TextAreaAutosize />
    </VStack>
  );
});
