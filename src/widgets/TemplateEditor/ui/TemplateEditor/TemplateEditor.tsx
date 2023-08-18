import { useCallback, useState } from 'react';
import cls from './TemplateEditor.module.css';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { MessagePreview } from '../MessagePreview/MessagePreview';
import { EditorContent } from './EditorContent/EditorContent';
import { TemplateType } from 'widgets/TemplateEditor/model/types/TemplateType';
import { TopBar } from './TopBar/TopBar';
import { BottomBar } from './BottomBar/BottomBar';
import { emptyTemplate } from 'widgets/TemplateEditor/model/services/createIfBlock';

export interface FocusType {
  path: string[];
  position?: number;
}

interface TemplateEditorProps {
  className?: string;
  closeHandler: () => void;
  callbackSave: (template: TemplateType) => Promise<void>;
  arrVarNames: string[];
  template: TemplateType;
}

/**
 * Компонент редактора сообщений
 * className - позволяет задать стиль компанента снаружи
 * closeHandler - функция закрытия редактора сообщений
 * callbackSave - функция сохранения шаблона сообщения
 * arrVarNames - массив имен переменных
 * template - объект шаблона
 */

export const TemplateEditor = (props: TemplateEditorProps) => {
  const {
    className,
    closeHandler,
    callbackSave,
    arrVarNames,
    template: initTemplate,
  } = props;
  const [showPreview, setShowPreview] = useState(false);
  const onClosePreview = useCallback(() => {
    setShowPreview(false);
  }, []);
  const [template, setTemplate] = useState(initTemplate || emptyTemplate);
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
        callbackSave={callbackSave}
        setShowPreview={setShowPreview}
        template={template}
      />
      {showPreview && (
        <MessagePreview
          onClose={onClosePreview}
          isOpen={showPreview}
          arrVarNames={arrVarNames}
          template={template}
        />
      )}
    </VStack>
  );
};
