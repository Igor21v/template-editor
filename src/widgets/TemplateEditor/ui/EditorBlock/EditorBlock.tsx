import { memo } from "react";
import cls from "./EditorBlock.module.css";
import { classNames } from "shared/lib/classNames/classNames";
import { HStack, VStack } from "shared/ui/Stack";
import { TextAreaAutosize } from "shared/ui/TextAreaAutosize";
import { Text } from "shared/ui/Text";
import { Button } from "shared/ui/Button";

interface EditorBlockProps {
  className?: string;
}

export const EditorBlock = memo((props: EditorBlockProps) => {
  const { className } = props;

  return (
    <VStack gap="8">
      <HStack className={cls.row} justify="between" max>
        <HStack className={cls.firstCol} gap="32" align="center">
          <Text text="IF" card />
          <Button theme="background" size="size_s">
            Delete
          </Button>
        </HStack>
        <TextAreaAutosize />
      </HStack>
      <HStack justify="between" max>
        <Text text="THEN" card className={cls.firstCol} />
        <TextAreaAutosize />
      </HStack>
      <HStack justify="between" max>
        <Text text="ELSE" card className={cls.firstCol} />
        <TextAreaAutosize />
      </HStack>
      <TextAreaAutosize />
    </VStack>
  );
});
