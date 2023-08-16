import { memo, useCallback, useMemo, useState } from 'react';
import cls from './TemplateEditor.module.css';
import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Button } from 'shared/ui/Button';
import { TemplatePreview } from '../MessagePreview/MessagePreview';

import { EditorBlocks } from './EditorBlocks/EditorBlocks';

import { initTemplate } from 'widgets/TemplateEditor/model/services/createIfBlock';
import { TemplateType } from 'widgets/TemplateEditor/model/types/TemplateType';
import { EditorTop } from './EditorTop/EditorTop';

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
  const [template, setTemplate] = useState(initTemplate);
  const changeTemplate = useCallback((value: TemplateType) => {
    setTemplate(value);
  }, []);
  const [focus, setFocus] = useState<FocusType>({ path: ['AFTER'] });

  const preventDefault = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  return (
    <VStack
      align="center"
      className={classNames(cls.TemplateEditor, {}, [className])}
      max
      gap="16"
    >
      <EditorTop
        arrVarNames={arrVarNames}
        changeTemplate={changeTemplate}
        template={template}
        focus={focus}
      />
      <EditorBlocks
        template={template}
        changeTemplate={changeTemplate}
        setFocus={setFocus}
      />
      <HStack max justify="center" gap="64">
        <Button onClick={onShowPreview}>Preview</Button>
        <Button
          theme="outlineGreen"
          onClick={saveHandler}
          onMouseDown={preventDefault}
        >
          Save
        </Button>
        <Button theme="outlineRed" onClick={closeHandler}>
          Close
        </Button>
      </HStack>
      {isPreview && (
        <TemplatePreview
          onClose={onClosePreview}
          isOpen={isPreview}
          arrVarNames={arrVarNames}
          template={template}
        />
      )}
    </VStack>
  );
});
