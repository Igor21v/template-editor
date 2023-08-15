import { memo, useCallback, useMemo, useState } from 'react';
import cls from './TemplateEditor.module.css';
import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Button } from 'shared/ui/Button';
import { TemplatePreview } from '../TemplatePreview/TemplatePreview';

import { EditorBlock } from '../EditorBlock/EditorBlock';
import { EditorTop } from '../EditorTop/EditorTop';
import {
  IfBlocksObjType,
  initIfBlocksObj,
} from 'widgets/TemplateEditor/model/objectBlock/createBlock';

export interface FocusType {
  path: string[];
  position?: number;
}

interface TemplateEditorProps {
  className?: string;
  closeHandler: () => void;
  saveHandler: () => void;
  arrVarNames: string[];
}

export const TemplateEditor = memo((props: TemplateEditorProps) => {
  const { className, closeHandler, saveHandler, arrVarNames } = props;
  const [isPreview, setIsPreview] = useState(false);
  const onClosePreview = () => {
    setIsPreview(false);
  };
  const onShowPreview = () => {
    setIsPreview(true);
  };
  const [ifBlocksObj, setIfBlocksObj] = useState(initIfBlocksObj);
  const changeIfBlockObj = useCallback((value: IfBlocksObjType) => {
    setIfBlocksObj(value);
  }, []);
  const [focus, setFocus] = useState<FocusType>({ path: ['AFTER'] });

  return (
    <VStack
      align="center"
      className={classNames(cls.TemplateEditor, {}, [className])}
      max
      gap="16"
    >
      <EditorTop
        arrVarNames={arrVarNames}
        changeIfBlockObj={changeIfBlockObj}
        ifBlocksObj={ifBlocksObj}
        focus={focus}
      />
      <EditorBlock
        ifBlocksObj={ifBlocksObj}
        changeIfBlockObj={changeIfBlockObj}
        setFocus={setFocus}
      />
      <HStack max justify="center" gap="64">
        <Button onClick={onShowPreview}>Preview</Button>
        <Button theme="outlineGreen" onClick={saveHandler}>
          Save
        </Button>
        <Button theme="outlineRed" onClick={closeHandler}>
          Close
        </Button>
      </HStack>
      {isPreview && (
        <TemplatePreview onClose={onClosePreview} isOpen={isPreview} />
      )}
    </VStack>
  );
});
