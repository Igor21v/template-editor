import { memo } from 'react';
import cls from './BottomBar.module.css';
import { HStack } from 'shared/ui/Stack';
import { Button } from 'shared/ui/Button';

interface BottomBarProps {
  closeHandler: () => void;
  saveHandler: () => void;
  setIsPreview: (val: boolean) => void;
}

export const BottomBar = memo((props: BottomBarProps) => {
  const { closeHandler, saveHandler, setIsPreview } = props;
  const preventDefault = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };
  const onShowPreview = () => {
    setIsPreview(true);
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
