import { memo, useCallback, useMemo, useState } from 'react';
import cls from './EditorTop.module.css';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text';
import { Button } from 'shared/ui/Button';
import { emptyIfBlock, IfBlocksObjType } from 'shared/const/initIfBlocksObj';
import { PositionType } from '../TemplateEditor/TemplateEditor';
import { getPropertyFromPath } from 'shared/lib/getPropertyFromPath';

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
    const ifBlocksObjClone = JSON.parse(JSON.stringify(ifBlocksObj));
    const propertyVal = getPropertyFromPath(position.path, ifBlocksObjClone);
    console.log(propertyVal);
    propertyVal.next.push(emptyIfBlock);
    changeIfBlockObj(ifBlocksObjClone);
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
