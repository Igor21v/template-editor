import { memo, useCallback, useMemo, useState } from 'react';
import cls from './EditorTop.module.css';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text';
import { Button } from 'shared/ui/Button';

import { FocusType } from '../TemplateEditor/TemplateEditor';
import { getPropertyFromPath } from 'shared/lib/getPropertyFromPath';
import {
  createBlock,
  IfBlocksObjType,
} from 'widgets/TemplateEditor/model/objectBlock/createBlock';

interface TemplateEditorProps {
  arrVarNames: string[];
  ifBlocksObj: IfBlocksObjType;
  changeIfBlockObj: (value: IfBlocksObjType) => void;
  focus: FocusType;
}

export const EditorTop = memo((props: TemplateEditorProps) => {
  const { arrVarNames, changeIfBlockObj, ifBlocksObj, focus } = props;
  const renderVarNamemes = useMemo(() => {
    return arrVarNames.map((badge: string) => (
      <Button theme="backgroundInverted" key={badge}>{`{${badge}}`}</Button>
    ));
  }, [arrVarNames]);

  const addBlock = () => {
    const field = focus.path.at(-1);
    if (field === 'THEN' || field === 'ELSE' || field === 'AFTER') {
      const ifBlocksObjClone = JSON.parse(JSON.stringify(ifBlocksObj));
      // При добавлении поля AFTER добаляем новый блок родителю
      if (field === 'AFTER' && focus.path.length > 1) {
        const path = focus.path.slice(0, -3);
        const index = focus.path.at(-2) || '0';
        const property = getPropertyFromPath(path, ifBlocksObjClone);
        const propertyVal = property.next[index].AFTER.value;
        property.next.splice(
          1 + parseInt(index),
          0,
          createBlock(propertyVal.slice(focus.position)),
        );
        property.next[index].AFTER.value = propertyVal.slice(0, focus.position);
      } else {
        const path = focus.path;
        const property = getPropertyFromPath(path, ifBlocksObjClone);
        property.next.unshift(
          createBlock(property.value.slice(focus.position)),
        );
        property.value = property.value.slice(0, focus.position);
      }

      changeIfBlockObj(ifBlocksObjClone);
    }
  };

  return (
    <>
      <Text
        title="Message Template Editor"
        align="center"
        className={cls.title}
      />
      <HStack max justify="between" align="center">
        <HStack gap="8">{renderVarNamemes}</HStack>
        <Button theme="backgroundInverted" size="size_m" onClick={addBlock}>
          Click to add IF-THEN-ELSE block
        </Button>
      </HStack>
    </>
  );
});
