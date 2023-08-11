import { memo, useMemo, useState } from "react";
import cls from "./TemplateEditor.module.css";
import { classNames } from "shared/lib/classNames/classNames";
import { TextAreaAutosize } from "shared/ui/TextAreaAutosize";
import { Card } from "shared/ui/Card";
import { HStack, VStack } from "shared/ui/Stack";
import { Text } from "shared/ui/Text";
import { Button } from "shared/ui/Button";
import { TemplatePreview } from "../TemplatePreview/TemplatePreview";
import { EditorBlock, IfBlocksObj } from "../EditorBlock/EditorBlock";

interface TemplateEditorProps {
  className?: string;
  closeHandler: () => void;
  saveHandler: () => void;
  arrVarNames: string[];
}

export const TemplateEditor = memo((props: TemplateEditorProps) => {
  const { className, closeHandler, saveHandler, arrVarNames } = props;
  const [isPreview, setIsPreview] = useState(false);
  const onClosePreview = () => {
    setIsPreview(false);
  };
  const onShowPreview = () => {
    setIsPreview(true);
  };
  const renderVarNamemes = useMemo(() => {
    return arrVarNames.map((badge: string) => (
      <Button theme="backgroundInverted" key={badge}>{`{${badge}}`}</Button>
    ));
  }, [arrVarNames]);

  const ifBlocksObj: IfBlocksObj = {
    key: 1,
    IF: {
      value: "222",
    },
    THEN: {
      value: "123",
      next: {
        key: 2,
        IF: {
          value: "222",
        },
        THEN: {
          value: "222",
        },
        ELSE: {
          value: "222",
        },
        AFTER: {
          value: "222222",
          next: {
            key: 3,
            IF: {
              value: "222",
            },
            THEN: {
              value: "222",
            },
            ELSE: {
              value: "222",
            },
            AFTER: {
              value: "222",
            },
          },
        },
      },
    },
    ELSE: {
      value: "222",
    },
    AFTER: {
      value: "222",
    },
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
        <HStack gap="8">{renderVarNamemes}</HStack>
        <Button theme="backgroundInverted" size="size_m">
          Click to add IF-THEN-ELSE block
        </Button>
      </HStack>
      <EditorBlock ifBlocksObj={ifBlocksObj} />
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
