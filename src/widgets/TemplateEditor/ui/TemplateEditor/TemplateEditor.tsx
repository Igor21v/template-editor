import { memo, useCallback, useState } from 'react';
import cls from './TemplateEditor.module.css';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { TemplatePreview } from '../MessagePreview/MessagePreview';

import { EditorContent } from './EditorContent/EditorContent';

import { initTemplate } from 'widgets/TemplateEditor/model/services/createIfBlock';
import { TemplateType } from 'widgets/TemplateEditor/model/types/TemplateType';
import { TopBar } from './TopBar/TopBar';
import { BottomBar } from './BottomBar/BottomBar';

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
  const [template, setTemplate] = useState(initTemplate);
  const changeTemplate = useCallback((value: TemplateType) => {
    setTemplate(value);
  }, []);
  const [focus, setFocus] = useState<FocusType>({ path: ['AFTER'] });

  return (
    <VStack
      align="center"
      className={classNames(cls.TemplateEditor, {}, [className])}
      max
      gap="16"
    >
      <TopBar
        arrVarNames={arrVarNames}
        changeTemplate={changeTemplate}
        template={template}
        focus={focus}
      />
      <EditorContent
        template={template}
        changeTemplate={changeTemplate}
        setFocus={setFocus}
      />
      <BottomBar
        closeHandler={closeHandler}
        saveHandler={saveHandler}
        setIsPreview={setIsPreview}
      />
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
