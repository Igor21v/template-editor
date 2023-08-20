import { memo, useState } from 'react';
import cls from './MainPage.module.css';
import { classNames } from 'shared/lib/classNames/classNames';
import { TemplateEditor, TemplateType } from 'widgets/TemplateEditor';
import { Button } from 'shared/ui/Button';
import { VStack } from 'shared/ui/Stack';

interface MainPageProps {
  className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
  const { className } = props;
  const [templIsOpen, setTemplIsOpen] = useState(false);

  //асинхронная функция сохранения шаблона
  const callbackSave = async (template: TemplateType) => {
    await new Promise((resolve) =>
      setTimeout(() => {
        localStorage.template = JSON.stringify(template);
        resolve(null);
      }, 500),
    );
  };

  //массив имен переменных
  const arrVarNames = localStorage.arrVarNames
    ? JSON.parse(localStorage.arrVarNames)
    : ['firstname', 'lastname', 'company', 'position'];

  //шаблон сообщения
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
