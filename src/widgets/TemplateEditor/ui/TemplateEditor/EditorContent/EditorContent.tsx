import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { Card } from 'shared/ui/Card';
import { EditorString } from './EditorString';
import { FocusType } from '../TemplateEditor';
import { TemplateType } from 'widgets/TemplateEditor/model/types/TemplateType';
import cls from './EditorContent.module.css';

interface EditorContentProps {
  template: TemplateType;
  changeTemplate: (value: TemplateType) => void;
  setFocus: (path: FocusType) => void;
  focus: FocusType;
}

/**
 * Компонент содержимого шаблона сообщения
 * template - объект шаблона
 * changeTemplate - функция изменения template
 * focus - текущая позиция фокуса
 * setFocus - функция запоминания фокуса
 */

export const EditorContent = memo((props: EditorContentProps) => {
  const { template, changeTemplate, setFocus, focus } = props;

  //Функция рендера блока условий из объекта шаблона
  const renderEditorBlocks = () => {
    let templateStrings: JSX.Element[] = [];
    const renderItemBlock = (
      templateBlock: TemplateType,
      nesting: number,
      path: string[],
    ) => {
      //итерируемся по каждой строке в объекте
      Object.entries(templateBlock).forEach(([field, value]) => {
        templateStrings.push(
          <EditorString
            changeTemplate={changeTemplate}
            template={template}
            nesting={nesting}
            path={[...path, field]}
            initValue={value.value}
            focus={focus}
            setFocus={setFocus}
            key={path?.join('') + field}
          />,
        );
        if (value.next?.length) {
          value.next.forEach((item: TemplateType, index: number) => {
            const newPath = [...path, field, 'next', `${index}`];
            renderItemBlock(item, nesting + 1, newPath);
          });
        }
      });
    };
    renderItemBlock(template, 0, []);
    return templateStrings;
  };

  return (
    <Card max className={cls.EditorContent}>
      <VStack gap="8">{renderEditorBlocks()}</VStack>
    </Card>
  );
});
