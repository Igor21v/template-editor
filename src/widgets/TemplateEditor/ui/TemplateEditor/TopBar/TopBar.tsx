import { memo } from 'react';
import cls from './TopBar.module.css';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text';
import { Button } from 'shared/ui/Button';
import { getPropertyFromPath } from 'shared/lib/getPropertyFromPath';
import { createIfBlock } from 'widgets/TemplateEditor/model/services/createIfBlock';
import { TemplateType } from 'widgets/TemplateEditor/model/types/TemplateType';
import { FocusType } from '../TemplateEditor';
import { stringSplice } from 'shared/lib/stringSplice/stringSplice';

interface TemplateEditorProps {
  arrVarNames: string[];
  template: TemplateType;
  changeTemplate: (value: TemplateType) => void;
  focus: FocusType;
}

/**
 * Верхняя панель
 * arrVarNames - массив имен переменных
 * template - объект шаблона
 * changeTemplate - функция изменения template
 * focus - место последнего фокуса
 */

export const TopBar = memo((props: TemplateEditorProps) => {
  const { arrVarNames, changeTemplate, template, focus } = props;

  const addBlock = () => {
    const field = focus.path.at(-1);
    if (field === 'THEN' || field === 'ELSE' || field === 'AFTER') {
      const templateClone = JSON.parse(JSON.stringify(template));
      // При добавлении поля AFTER добаляем новый блок родителю
      if (field === 'AFTER' && focus.path.length > 1) {
        const parentPath = focus.path.slice(0, -3);
        const path = focus.path;
        const index = focus.path.at(-2) || '0';
        const parentProperty = getPropertyFromPath(parentPath, templateClone);
        const property = getPropertyFromPath(path, templateClone);
        const propertyVal = property.value;
        parentProperty.next.splice(
          1 + parseInt(index),
          0,
          createIfBlock(propertyVal.slice(focus.position)),
        );
        property.value = propertyVal.slice(0, focus.position);
      } else {
        const path = focus.path;
        const property = getPropertyFromPath(path, templateClone);
        property.next.unshift(
          createIfBlock(property.value.slice(focus.position)),
        );
        property.value = property.value.slice(0, focus.position);
      }
      changeTemplate(templateClone);
    }
  };

  const addVar = (variable: string) => () => {
    const templateClone = JSON.parse(JSON.stringify(template));
    const path = focus.path;
    const property = getPropertyFromPath(path, templateClone);
    const propertyVal = property.value;
    property.value = stringSplice(
      propertyVal,
      focus.position,
      0,
      `{${variable}}`,
    );
    changeTemplate(templateClone);
  };

  const preventDefault = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const renderVarNamemes = () =>
    arrVarNames.map((badge: string) => (
      <Button
        theme="backgroundInverted"
        key={badge}
        onClick={addVar(badge)}
        onMouseDown={preventDefault}
      >{`{${badge}}`}</Button>
    ));

  return (
    <>
      <Text
        title="Message Template Editor"
        align="center"
        className={cls.title}
      />
      <HStack max justify="between" align="center">
        <HStack gap="8">{renderVarNamemes()}</HStack>
        <Button
          theme="backgroundInverted"
          size="size_m"
          onClick={addBlock}
          onMouseDown={preventDefault}
        >
          Click to add IF-THEN-ELSE block
        </Button>
      </HStack>
    </>
  );
});
