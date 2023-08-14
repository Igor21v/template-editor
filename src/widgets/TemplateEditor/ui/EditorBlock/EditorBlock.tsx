import { memo } from 'react';
import cls from './EditorBlock.module.css';
import { VStack } from 'shared/ui/Stack';
import { TextAreaAutosize } from 'shared/ui/TextAreaAutosize';
import { Card } from 'shared/ui/Card';
import { getPropertyFromPath } from 'shared/lib/getPropertyFromPath';
import { EditorBlockString } from './EditorBlockString';

export interface itemIfBlock {
  value: string;
  next?: IfBlocksObj;
}

export interface IfBlocksObj {
  IF?: itemIfBlock;
  THEN?: itemIfBlock;
  ELSE?: itemIfBlock;
  AFTER?: itemIfBlock;
}

interface EditorBlockProps {
  className?: string;
  ifBlocksObj: IfBlocksObj;
  changeIfBlockObj: (value: IfBlocksObj) => void;
}

export const EditorBlock = memo((props: EditorBlockProps) => {
  const { ifBlocksObj, changeIfBlockObj } = props;

  //Функция рендера блока условий из объекта
  const renderEditorBlocks = () => {
    let blockStrings: JSX.Element[] = [];
    const renderItemBlock = (
      obj: IfBlocksObj,
      nesting: number,
      path: string[],
    ) => {
      //итерируемся по каждой строке в объекте
      Object.entries(obj).forEach(([field, value]) => {
        blockStrings.push(
          <EditorBlockString
            changeIfBlockObj={changeIfBlockObj}
            ifBlocksObj={ifBlocksObj}
            nesting={nesting}
            path={[...path, field]}
            value={value.value}
            key={path?.join('') + field}
          />,
        );
        if (value.next) {
          const newPath = [...path, field, 'next'];
          renderItemBlock(value.next, nesting + 1, newPath);
        }
      });
    };
    if (ifBlocksObj.IF) {
      renderItemBlock(ifBlocksObj, 0, []);
    }
    return blockStrings;
  };

  return (
    <Card max>
      <TextAreaAutosize />
      <VStack gap="8">{renderEditorBlocks()}</VStack>
    </Card>
  );
});
