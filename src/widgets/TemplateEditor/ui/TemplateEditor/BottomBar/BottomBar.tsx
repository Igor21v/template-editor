import { memo, useState } from 'react';
import cls from './BottomBar.module.css';
import { HStack } from 'shared/ui/Stack';
import { Button } from 'shared/ui/Button';
import { TemplateType } from 'widgets/TemplateEditor/model/types/TemplateType';
import { classNames } from 'shared/lib/classNames/classNames';

interface BottomBarProps {
  closeHandler: () => void;
  callbackSave: (template: TemplateType) => Promise<void>;
  setIsPreview: (val: boolean) => void;
  template: TemplateType;
}

export const BottomBar = memo((props: BottomBarProps) => {
  const { closeHandler, callbackSave, setIsPreview, template } = props;
  const preventDefault = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };
  const onShowPreview = () => {
    setIsPreview(true);
  };
  const [seved, setSaved] = useState(false);
  const saveHandler = async () => {
    setSaved(false);
    await callbackSave(template);
    setSaved(true);
  };

  return (
    <HStack max justify="center" gap="64">
      <Button onClick={onShowPreview}>Preview</Button>
      <Button
        theme="outlineGreen"
        onClick={saveHandler}
        onMouseDown={preventDefault}
        className={classNames('', { [cls.saveButton]: seved })}
      >
        Save
      </Button>
      <Button theme="outlineRed" onClick={closeHandler}>
        Close
      </Button>
    </HStack>
  );
});
