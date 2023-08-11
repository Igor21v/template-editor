import { memo } from "react";
import cls from "./EditorBlock.module.css";
import { HStack, VStack } from "shared/ui/Stack";
import { TextAreaAutosize } from "shared/ui/TextAreaAutosize";
import { Text } from "shared/ui/Text";
import { Button } from "shared/ui/Button";
import { Card } from "shared/ui/Card";

interface itemIfBlock {
  value: string;
  next?: IfBlocksObj;
}

export interface IfBlocksObj {
  key?: number;
  IF?: itemIfBlock;
  THEN?: itemIfBlock;
  ELSE?: itemIfBlock;
  AFTER?: itemIfBlock;
}

interface EditorBlockProps {
  className?: string;
  ifBlocksObj: IfBlocksObj;
}

export const EditorBlock = memo((props: EditorBlockProps) => {
  const { ifBlocksObj } = props;

  //Функция рендера блока условий из объекта
  const renderEditorBlocks = () => {
    let blockStrings: JSX.Element[] = [];
    const renderItemBlock = (obj: IfBlocksObj, nesting: number) => {
      //итерируемся по каждой строке в объекте
      Object.entries(obj).forEach(([field, value]) => {
        if (field !== "key") {
          blockStrings.push(renderString(field, nesting, value.value, obj.key));
          if (value.next) {
            renderItemBlock(value.next, nesting + 1);
          }
        }
      });
    };
    if (ifBlocksObj.key) {
      renderItemBlock(ifBlocksObj, 0);
    }
    return blockStrings;
  };

  function renderString(
    type: string,
    nesting: number,
    value: string,
    key?: number
  ) {
    let content = null;
    switch (type) {
      case "AFTER":
        content = (
          <HStack justify="between" max>
            <TextAreaAutosize value={value} />
          </HStack>
        );
        break;
      case "IF":
        content = (
          <HStack justify="between" max>
            <HStack className={cls.firstCol} gap="32" align="center">
              <Text text="IF" badge />
              <Button theme="background" size="size_s">
                Delete
              </Button>
            </HStack>
            <TextAreaAutosize value={value} />
          </HStack>
        );
        break;
      default:
        content = (
          <HStack justify="between" max>
            <Text text={type} badge className={cls.firstCol} />
            <TextAreaAutosize value={value} />
          </HStack>
        );
    }
    return (
      <div
        className={cls.stringWrapper}
        style={{ paddingLeft: nesting * 132 }}
        key={key + type}
      >
        {content}
      </div>
    );
  }

  return (
    <Card max>
      <TextAreaAutosize />
      <VStack gap="8">{renderEditorBlocks()}</VStack>
    </Card>
  );
});
