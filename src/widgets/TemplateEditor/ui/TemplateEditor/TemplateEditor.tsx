import { memo, useCallback, useMemo, useState } from 'react';
import cls from './TemplateEditor.module.css';
import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Button } from 'shared/ui/Button';
import { TemplatePreview } from '../TemplatePreview/TemplatePreview';
import { IfBlocksObjType, initIfBlocksObj } from 'shared/const/initIfBlocksObj';
import { EditorBlock } from '../EditorBlock/EditorBlock';
import { EditorTop } from '../EditorTop/EditorTop';

export interface PositionType {
  path: string[];
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
  const [position, setPosition] = useState<PositionType>({ path: ['AFTER'] });
  console.log('position ' + position.path);

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
        position={position}
      />
      <EditorBlock
        ifBlocksObj={ifBlocksObj}
        changeIfBlockObj={changeIfBlockObj}
        setPosition={setPosition}
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
