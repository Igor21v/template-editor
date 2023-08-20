import { memo, useRef, useState, useCallback } from 'react';
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
  setFocus: (focus: FocusType) => void;
  focus: FocusType;
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
  const {
    nesting,
    initValue,
    path,
    changeTemplate,
    template,
    setFocus,
    focus,
  } = props;

  const [areaVal, setAreaVal] = useState(initValue);

  // Флаг изменения значения с функции areaOnChangeHandler(ввод в поле)
  const changesFromArea = useRef(false);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  // Функция записи значения поля в шаблон (с задержкой для исключения подвисаний интерфейса)
  const areaValToTemplate = useDebounce((value) => {
    const templateClone = JSON.parse(JSON.stringify(template));
    const propertyValClone = getPropertyFromPath(path, templateClone);
    propertyValClone.value = value;
    changeTemplate(templateClone);
    changesFromArea.current = false;
  }, 100);

  // Проверяем совпадает ли значение с шаблоном
  const propertyVal = getPropertyFromPath(path, template);
  if (propertyVal.value !== areaVal) {
    // Если есть флаг измений с поля, то пишем в шаблон, иначе в поле
    if (changesFromArea.current) {
      areaValToTemplate(areaVal);
    } else {
      // устанавливаем фокус
      if (focus.path.join('') === path.join('')) {
        areaRef.current?.focus();
      }
      setAreaVal(propertyVal.value);
      // если добавили переменную то нужно установить новый фокус
      if (propertyVal.value.length > areaVal.length) {
        const newPosition =
          focus.position + (propertyVal.value.length - areaVal.length);
        queueMicrotask(() => {
          areaRef.current?.setSelectionRange(newPosition, newPosition);
        });
      }
    }
  }

  // Функция изменения поля
  const areaOnChangeHandler = useCallback((value: string) => {
    changesFromArea.current = true;
    setAreaVal(value);
  }, []);

  // Функция удаления блока условия
  const deleteHandler = useCallback(() => {
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
  }, [changeTemplate, path, setFocus, template]);

  // Функция запоминания позиции курсора
  const setPositionHandler = useCallback(
    (selectionStart: number) => {
      setFocus({ path, position: selectionStart });
    },
    [path, setFocus],
  );

  let content = null;
  switch (path.at(-1)) {
    case 'AFTER':
      content = (
        <HStack justify="between" max>
          <TextAreaAutosize
            ref={areaRef}
            value={areaVal}
            onChange={areaOnChangeHandler}
            onSelect={setPositionHandler}
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
            <Button theme="background" size="size_s" onClick={deleteHandler}>
              Delete
            </Button>
          </HStack>
          <TextAreaAutosize
            ref={areaRef}
            value={areaVal}
            onChange={areaOnChangeHandler}
            onSelect={setPositionHandler}
          />
        </HStack>
      );
      break;
    default:
      content = (
        <HStack justify="between" max>
          <Text text={path.at(-1)} badge className={cls.firstCol} />
          <TextAreaAutosize
            ref={areaRef}
            value={areaVal}
            onChange={areaOnChangeHandler}
            onSelect={setPositionHandler}
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
