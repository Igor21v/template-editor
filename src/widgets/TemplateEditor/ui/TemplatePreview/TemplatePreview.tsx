import { memo, useCallback, useState } from "react";
import cls from "./TemplatePreview.module.css";
import { classNames } from "shared/lib/classNames/classNames";
import { Modal } from "shared/ui/Modal";
import { Card } from "shared/ui/Card";
import { HStack, VStack } from "shared/ui/Stack";
import { Text } from "shared/ui/Text";
import { Input } from "shared/ui/Input";
import { TextAreaAutosize } from "shared/ui/TextAreaAutosize";
import { Button } from "shared/ui/Button";

interface TemplatePreviewProps {
  className?: string;
  onClose?: () => void;
  isOpen: boolean;
}

export const TemplatePreview = memo((props: TemplatePreviewProps) => {
  const { className, onClose, isOpen } = props;
  const [needModalClose, setNeedModalClose] = useState(false);
  const resetNeedModalClose = useCallback(() => {
    setNeedModalClose(false);
  }, []);
  const cancelHandle = useCallback(() => {
    setNeedModalClose(true);
  }, []);
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      needModalClose={needModalClose}
      resetNeedModalClose={resetNeedModalClose}
    >
      <VStack gap="8" align="center">
        <Text title="Message Preview" />
        <TextAreaAutosize readOnly value="1ldfklsdfkljskjasfjkl" />
        <HStack wrap gap="8">
          <Text text="Variables: " />
          <Input placeholder="firstname" />
          <Input placeholder="lastname" />
          <Input placeholder="company" />
          <Input placeholder="position" />
        </HStack>
        <Button onClick={cancelHandle}>Close</Button>
      </VStack>
    </Modal>
  );
});
