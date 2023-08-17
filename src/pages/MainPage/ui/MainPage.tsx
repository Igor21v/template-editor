import { memo, useState } from 'react';
import cls from './MainPage.module.css';
import { classNames } from 'shared/lib/classNames/classNames';
import { TemplateEditor } from 'widgets/TemplateEditor';
import { Button } from 'shared/ui/Button';
import { VStack } from 'shared/ui/Stack';
import { TemplateType } from 'widgets/TemplateEditor/model/types/TemplateType';

interface MainPageProps {
  className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
  const { className } = props;
  const [templIsOpen, setTemplIsOpen] = useState(true);

  const callbackSave = (template: TemplateType) => {
    localStorage.template = JSON.stringify(template);
  };
  const arrVarNames = localStorage.arrVarNames
    ? JSON.parse(localStorage.arrVarNames)
    : ['firstname', 'lastname', 'company', 'position'];
  const initTemplate = localStorage.template
    ? JSON.parse(localStorage.template)
    : null;

  if (templIsOpen) {
    return (
      <div className={classNames(cls.MainPage, {}, [className])}>
        <TemplateEditor
          callbackSave={callbackSave}
          arrVarNames={arrVarNames}
          template={initTemplate}
          closeHandler={() => setTemplIsOpen(false)}
        />
      </div>
    );
  }
  return (
    <VStack
      align="center"
      max
      justify="center"
      className={classNames(cls.MainPage, {}, [className])}
    >
      <Button onClick={() => setTemplIsOpen(true)}>Message Editor</Button>
    </VStack>
  );
});
