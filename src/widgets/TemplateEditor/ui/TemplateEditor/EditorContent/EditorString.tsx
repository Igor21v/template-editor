import { memo, useState } from 'react';
import cls from './EditorContent.module.css';
import { HStack } from 'shared/ui/Stack';
import { TextAreaAutosize } from 'shared/ui/TextAreaAutosize';
import { Text } from 'shared/ui/Text';
import { Button } from 'shared/ui/Button';
import { getPropertyFromPath } from 'shared/lib/getPropertyFromPath';
import { FocusType } from '../TemplateEditor';
import { TemplateType } from 'widgets/TemplateEditor/model/types/TemplateType';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';

interface EditorStringProps {
  nesting: number;
  initValue: string;
  changeTemplate: (value: TemplateType) => void;
  path: string[];
  template: TemplateType;
  setFocus: (position: FocusType) => void;
}

/**
 * Компонент рендера строки блока условий
 * nesting - уровень вложенности условия (для сдвига блока условия вправо)
 * initValue - начальное значение строки
 * changeTemplate - функция изменения template
 * path - путь до объекта (формат ['IF','next', '0','THEN','next', '1', 'ELSE])
 * template - объект шаблона
 * setFocus - функция запоминания фокуса
 */

export const EditorString = memo((props: EditorStringProps) => {
  const { nesting, initValue, path, changeTemplate, template, setFocus } =
    props;

  const [areaVal, setAreaVal] = useState(initValue);
  // Функция записи значения поля в шаблон (с задержкой для исключения подвисаний интерфейса)
  const areaValToTemplate = useDebounce((value) => {
    const templateClone = JSON.parse(JSON.stringify(template));
    const propertyVal = getPropertyFromPath(path, templateClone);
    propertyVal.value = value;
    changeTemplate(templateClone);
  }, 300);

  const areaOnChangeHandler = (path: string[]) => {
    return (value: string) => {
      setAreaVal(value);
      areaValToTemplate(value);
    };
  };

  const deleteHandler = (path: string[]) => {
    return () => {
      let templateClone = JSON.parse(JSON.stringify(template));
      const index = parseInt(path.slice(-2, -1)[0]);
      // Вычисляем родительский блок
      const parentPropertyPath = path.slice(0, -3);
      const parentProperty = getPropertyFromPath(
        parentPropertyPath,
        templateClone,
      );
      // Добавляем текст с удаляемого блока на верхний блок
      let concatPath = parentPropertyPath;
      // Если есть блок токо же уровня сверху то добавляем в него
      if (index > 0) {
        concatPath = [...parentPropertyPath, 'next', `${index - 1}`, 'AFTER'];
      }
      const concatProperty = getPropertyFromPath(concatPath, templateClone);
      concatProperty.value =
        concatProperty.value + parentProperty.next[index].AFTER.value;
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
            value={areaVal}
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
            value={areaVal}
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
            value={areaVal}
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
