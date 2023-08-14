import { memo } from 'react';
import cls from './EditorBlock.module.css';
import { VStack } from 'shared/ui/Stack';
import { TextAreaAutosize } from 'shared/ui/TextAreaAutosize';
import { Card } from 'shared/ui/Card';
import { EditorBlockString } from './EditorBlockString';
import { IfBlocksObj } from 'shared/const/initIfBlocksObj';

interface EditorBlockProps {
  className?: string;
  ifBlocksObj: IfBlocksObj;
  changeIfBlockObj: (value: IfBlocksObj) => void;
  setPosition: ({ path }: { path: string[] }) => void;
}

/**
 * Компонент рендера блока условий
 * ifBlocksObj - объект условий
 * changeIfBlockObj - функция изменения ifBlocksObj
 */

export const EditorBlock = memo((props: EditorBlockProps) => {
  const { ifBlocksObj, changeIfBlockObj, setPosition } = props;

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
            setPosition={setPosition}
            key={path?.join('') + field}
          />,
        );
        if (value.next) {
          const newPath = [...path, field, 'next'];
          renderItemBlock(value.next, nesting + 1, newPath);
        }
      });
    };
    renderItemBlock(ifBlocksObj, 0, []);
    return blockStrings;
  };

  return (
    <Card max>
      <VStack gap="8">{renderEditorBlocks()}</VStack>
    </Card>
  );
});
