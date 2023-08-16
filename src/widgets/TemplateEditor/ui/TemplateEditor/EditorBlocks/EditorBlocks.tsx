import { memo } from 'react';
import cls from './EditorBlocks.module.css';
import { VStack } from 'shared/ui/Stack';
import { Card } from 'shared/ui/Card';
import { EditorBlockString } from './EditorBlockString';
import { FocusType } from '../TemplateEditor';
import { TemplateType } from 'widgets/TemplateEditor/model/types/TemplateType';

interface EditorBlocksProps {
  className?: string;
  template: TemplateType;
  changeTemplate: (value: TemplateType) => void;
  setFocus: (path: FocusType) => void;
}

/**
 * Компонент рендера блока условий
 * template - объект шаблона
 * changeTemplate - функция изменения template
 */

export const EditorBlocks = memo((props: EditorBlocksProps) => {
  const { template, changeTemplate, setFocus: setPosition } = props;

  //Функция рендера блока условий из объекта
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
          <EditorBlockString
            changeTemplate={changeTemplate}
            template={template}
            nesting={nesting}
            path={[...path, field]}
            value={value.value}
            setFocus={setPosition}
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
    <Card max>
      <VStack gap="8">{renderEditorBlocks()}</VStack>
    </Card>
  );
});
