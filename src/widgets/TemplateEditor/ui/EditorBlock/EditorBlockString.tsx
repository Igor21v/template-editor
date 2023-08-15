import { memo } from 'react';
import cls from './EditorBlock.module.css';
import { HStack } from 'shared/ui/Stack';
import { TextAreaAutosize } from 'shared/ui/TextAreaAutosize';
import { Text } from 'shared/ui/Text';
import { Button } from 'shared/ui/Button';
import { getPropertyFromPath } from 'shared/lib/getPropertyFromPath';
import { FocusType } from '../TemplateEditor/TemplateEditor';
import { IfBlocksObjType } from 'widgets/TemplateEditor/model/objectBlock/createBlock';

interface EditorBlockStringProps {
  nesting: number;
  value: string;
  path: string[];
  ifBlocksObj: IfBlocksObjType;
  changeIfBlockObj: (value: IfBlocksObjType) => void;
  setFocus: (position: FocusType) => void;
}

/**
 * Компонент рендера строки блока условий
 * nesting - уровень вложенности условия (для сдвига блока условия вправо)
 * value - занчие поля
 * path - путь до объекта (формат ['IF','next','THEN','next', 'ELSE])
 * ifBlocksObj - объект условий
 * changeIfBlockObj - функция изменения ifBlocksObj
 * setPosition - функция запоминания позиции курсора
 */

export const EditorBlockString = memo((props: EditorBlockStringProps) => {
  const {
    nesting,
    value,
    path,
    changeIfBlockObj,
    ifBlocksObj,
    setFocus: setPosition,
  } = props;

  const areaOnChangeHandler = (path: string[]) => {
    return (value?: string) => {
      const ifBlocksObjClone = JSON.parse(JSON.stringify(ifBlocksObj));
      const propertyVal = getPropertyFromPath(path, ifBlocksObjClone);
      propertyVal.value = value;
      changeIfBlockObj(ifBlocksObjClone);
    };
  };

  const deleteHandler = (path: string[]) => {
    return () => {
      let ifBlocksObjClone = JSON.parse(JSON.stringify(ifBlocksObj));
      const parentPath = path.slice(0, -2);
      const index = path.slice(-2, -1);
      const propertyVal = getPropertyFromPath(parentPath, ifBlocksObjClone);
      propertyVal.splice(index, 1);
      changeIfBlockObj(ifBlocksObjClone);
      setPosition({ path: ['AFTER'], position: 0 });
    };
  };

  const setPositionHandler = (path: string[]) => (selectionStart?: number) => {
    setPosition({ path, position: selectionStart });
  };

  let content = null;
  switch (path.at(-1)) {
    case 'AFTER':
      content = (
        <HStack justify="between" max>
          <TextAreaAutosize
            value={value}
            onChange={areaOnChangeHandler(path)}
            onSelect={setPositionHandler(path)}
            autoFocus={!nesting}
          />
        </HStack>
      );
      break;
    case 'IF':
      content = (
        <HStack justify="between" max>
          <HStack className={cls.firstCol} gap="32" align="center">
            <Text text="IF" badge />
            <Button
              theme="background"
              size="size_s"
              onClick={deleteHandler(path)}
            >
              Delete
            </Button>
          </HStack>
          <TextAreaAutosize
            value={value}
            onChange={areaOnChangeHandler(path)}
            onSelect={setPositionHandler(path)}
          />
        </HStack>
      );
      break;
    default:
      content = (
        <HStack justify="between" max>
          <Text text={path.at(-1)} badge className={cls.firstCol} />
          <TextAreaAutosize
            value={value}
            onChange={areaOnChangeHandler(path)}
            onSelect={setPositionHandler(path)}
          />
        </HStack>
      );
  }
  return (
    <div
      className={cls.stringWrapper}
      style={{ paddingLeft: (nesting - 1) * 132 }}
    >
      {content}
    </div>
  );
});
