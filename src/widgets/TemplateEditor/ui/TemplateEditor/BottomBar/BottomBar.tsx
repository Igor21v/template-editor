import { memo } from 'react';
import cls from './BottomBar.module.css';
import { HStack } from 'shared/ui/Stack';
import { Button } from 'shared/ui/Button';
import { TemplateType } from 'widgets/TemplateEditor/model/types/TemplateType';

interface BottomBarProps {
  closeHandler: () => void;
  callbackSave: (template: TemplateType) => void;
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
  const saveHandler = () => {
    callbackSave(template);
  };

  return (
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
  );
});
