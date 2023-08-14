import { memo, useCallback, useMemo, useState } from 'react';
import cls from './EditorTop.module.css';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text';
import { Button } from 'shared/ui/Button';

interface TemplateEditorProps {
  arrVarNames: string[];
}

export const EditorTop = memo((props: TemplateEditorProps) => {
  const { arrVarNames } = props;
  const renderVarNamemes = useMemo(() => {
    return arrVarNames.map((badge: string) => (
      <Button theme="backgroundInverted" key={badge}>{`{${badge}}`}</Button>
    ));
  }, [arrVarNames]);

  return (
    <>
      <Text
        title="Message Template Editor"
        align="center"
        className={cls.title}
      />
      <HStack max justify="between" align="center">
        <HStack gap="8">{renderVarNamemes}</HStack>
        <Button theme="backgroundInverted" size="size_m">
          Click to add IF-THEN-ELSE block
        </Button>
      </HStack>
    </>
  );
});
