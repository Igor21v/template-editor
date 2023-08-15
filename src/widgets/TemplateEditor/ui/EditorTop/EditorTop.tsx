import { memo, useCallback, useMemo, useState } from 'react';
import cls from './EditorTop.module.css';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text';
import { Button } from 'shared/ui/Button';

import { PositionType } from '../TemplateEditor/TemplateEditor';
import { getPropertyFromPath } from 'shared/lib/getPropertyFromPath';
import {
  createBlock,
  IfBlocksObjType,
} from 'widgets/TemplateEditor/model/objectBlock/createBlock';

interface TemplateEditorProps {
  arrVarNames: string[];
  ifBlocksObj: IfBlocksObjType;
  changeIfBlockObj: (value: IfBlocksObjType) => void;
  position: PositionType;
}

export const EditorTop = memo((props: TemplateEditorProps) => {
  const { arrVarNames, changeIfBlockObj, ifBlocksObj, position } = props;
  const renderVarNamemes = useMemo(() => {
    return arrVarNames.map((badge: string) => (
      <Button theme="backgroundInverted" key={badge}>{`{${badge}}`}</Button>
    ));
  }, [arrVarNames]);

  const addBlock = () => {
    const field = position.path.at(-1);
    if (field === 'THEN' || field === 'ELSE' || field === 'AFTER') {
      const ifBlocksObjClone = JSON.parse(JSON.stringify(ifBlocksObj));
      let path = [];
      if (field === 'AFTER' && position.path.length > 1) {
        path = position.path.slice(0, -3);
        const index = position.path.at(-2);
        const propertyVal = getPropertyFromPath(path, ifBlocksObjClone);
        propertyVal.next.splice(
          1 + parseInt(index || '0'),
          0,
          createBlock('ff'),
        );
      } else {
        path = position.path;
        const propertyVal = getPropertyFromPath(path, ifBlocksObjClone);
        const valueSourceField = propertyVal.value;
        console.log(valueSourceField);
        propertyVal.next.unshift(createBlock('vv'));
      }

      console.log('position ' + position.position);
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
