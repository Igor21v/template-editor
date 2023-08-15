import { memo } from 'react';
import cls from './EditorBlocks.module.css';
import { HStack } from 'shared/ui/Stack';
import { TextAreaAutosize } from 'shared/ui/TextAreaAutosize';
import { Text } from 'shared/ui/Text';
import { Button } from 'shared/ui/Button';
import { getPropertyFromPath } from 'shared/lib/getPropertyFromPath';
import { FocusType } from '../TemplateEditor/TemplateEditor';
import { TemplateType } from 'widgets/TemplateEditor/model/objectTemplate/createBlock';

interface EditorBlockStringProps {
  nesting: number;
  value: string;
  path: string[];
  template: TemplateType;
  changeTemplate: (value: TemplateType) => void;
  setFocus: (position: FocusType) => void;
}

/**
 * Компонент рендера строки блока условий
 * nesting - уровень вложенности условия (для сдвига блока условия вправо)
 * value - занчие поля
 * path - путь до объекта (формат ['IF','next','THEN','next', 'ELSE])
 * template - объект шаблона
 * changeTemplate - функция изменения template
 * setPosition - функция запоминания позиции курсора
 */

export const EditorBlockString = memo((props: EditorBlockStringProps) => {
  const { nesting, value, path, changeTemplate, template, setFocus } = props;

  const areaOnChangeHandler = (path: string[]) => {
    return (value?: string) => {
      const templateClone = JSON.parse(JSON.stringify(template));
      const propertyVal = getPropertyFromPath(path, templateClone);
      propertyVal.value = value;
      changeTemplate(templateClone);
    };
  };

  const deleteHandler = (path: string[]) => {
    return () => {
      let templateClone = JSON.parse(JSON.stringify(template));
      const parentPath = path.slice(0, -3);
      const [index] = path.slice(-2, -1);
      console.log(parentPath);
      console.log(template);
      const parentProperty = getPropertyFromPath(parentPath, templateClone);
      parentProperty.value =
        parentProperty.value + parentProperty.next[parseInt(index)].AFTER.value;
      parentProperty.next.splice(index, 1);
      changeTemplate(templateClone);
      setFocus({ path: ['AFTER'], position: 0 });
    };
  };

  const setPositionHandler = (path: string[]) => (selectionStart?: number) => {
    setFocus({ path, position: selectionStart });
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
