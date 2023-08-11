import { memo } from "react";
import cls from "./EditorBlock.module.css";
import { HStack, VStack } from "shared/ui/Stack";
import { TextAreaAutosize } from "shared/ui/TextAreaAutosize";
import { Text } from "shared/ui/Text";
import { Button } from "shared/ui/Button";
import { Card } from "shared/ui/Card";

export interface itemIfBlock {
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

type IfBlocksObjKey = keyof IfBlocksObj;

interface EditorBlockProps {
  className?: string;
  ifBlocksObj: IfBlocksObj;
  changeIfBlockObj: (value: IfBlocksObj) => void;
}

export const EditorBlock = memo((props: EditorBlockProps) => {
  const { ifBlocksObj } = props;

  const areaOnChangeHandler =
    (path: string[], field: string) => (value?: string) => {
      const pathToProp = (path.join(".") +
        "." +
        field) as keyof typeof EditorBlock;
      console.log(EditorBlock[pathToProp]);
      /* EditorBlock[key] = "111"; */
    };
  areaOnChangeHandler(["THEN"], "AFTER")();

  //Функция рендера блока условий из объекта
  const renderEditorBlocks = () => {
    let blockStrings: JSX.Element[] = [];
    const renderItemBlock = (
      obj: IfBlocksObj,
      nesting: number,
      path: string[]
    ) => {
      //итерируемся по каждой строке в объекте
      Object.entries(obj).forEach(([field, value]) => {
        if (field !== "key") {
          blockStrings.push(renderString(field, nesting, value.value, path));
          if (value.next) {
            renderItemBlock(value.next, nesting + 1, [...path, field]);
          }
        }
      });
    };
    if (ifBlocksObj.key) {
      renderItemBlock(ifBlocksObj, 0, []);
    }
    return blockStrings;
  };

  function renderString(
    type: string,
    nesting: number,
    value: string,
    path?: string[]
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
        key={path?.join("") + type}
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
