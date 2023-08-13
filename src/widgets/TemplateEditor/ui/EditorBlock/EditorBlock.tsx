import { memo } from 'react';
import cls from './EditorBlock.module.css';
import { HStack, VStack } from 'shared/ui/Stack';
import { TextAreaAutosize } from 'shared/ui/TextAreaAutosize';
import { Text } from 'shared/ui/Text';
import { Button } from 'shared/ui/Button';
import { Card } from 'shared/ui/Card';

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

  const getProperty = (path: string[], obj: any) =>
    path.reduce((acc: any, el) => (acc = acc[el]), obj);
  const setProperty = (path: string[], obj?: any, value?: any) => {
    if (path.length > 0) {
      setProperty(path.slice(1), obj[path[0]], value);
    } else {
      obj = value;
    }
  };

  const areaOnChangeHandler = (path: string[], field: string) => {
    const pathEl = [...path, field];
    return (value?: string) => {
      const propertyVal = getProperty(pathEl, ifBlocksObj);
      propertyVal.value = value;
      setProperty(pathEl, ifBlocksObj, propertyVal);
      console.log('ifBlocksObj ' + JSON.stringify(ifBlocksObj));
      changeIfBlockObj(ifBlocksObj);
    };
  };

  /* areaOnChangeHandler(["THEN", "next"], "ELSE")(); */

  //Функция рендера блока условий из объекта
  const renderEditorBlocks = () => {
    let blockStrings: JSX.Element[] = [];
    const renderItemBlock = (
      obj: IfBlocksObj,
      nesting: number,
      path: string[],
    ) => {
      //итерируемся по каждой строке в объекте
      console.log(path);
      Object.entries(obj).forEach(([field, value]) => {
        blockStrings.push(renderString(field, nesting, value.value, path));
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

  function renderString(
    type: string,
    nesting: number,
    value: string,
    path: string[],
  ) {
    let content = null;
    switch (type) {
      case 'AFTER':
        content = (
          <HStack justify="between" max>
            <TextAreaAutosize
              value={value}
              onChange={areaOnChangeHandler(path, type)}
            />
          </HStack>
        );
        break;
      case 'IF':
        content = (
          <HStack justify="between" max>
            <HStack className={cls.firstCol} gap="32" align="center">
              <Text text="IF" badge />
              <Button theme="background" size="size_s">
                Delete
              </Button>
            </HStack>
            <TextAreaAutosize
              value={value}
              onChange={areaOnChangeHandler(path, type)}
            />
          </HStack>
        );
        break;
      default:
        content = (
          <HStack justify="between" max>
            <Text text={type} badge className={cls.firstCol} />
            <TextAreaAutosize
              value={value}
              onChange={areaOnChangeHandler(path, type)}
            />
          </HStack>
        );
    }
    return (
      <div
        className={cls.stringWrapper}
        style={{ paddingLeft: nesting * 132 }}
        key={path?.join('') + type}
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
