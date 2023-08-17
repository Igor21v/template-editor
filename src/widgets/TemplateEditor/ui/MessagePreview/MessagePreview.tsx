import { memo, useCallback, useMemo, useState } from 'react';
import cls from './MessagePreview.module.css';
import { Modal } from 'shared/ui/Modal';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text';
import { Input } from 'shared/ui/Input';
import { TextAreaAutosize } from 'shared/ui/TextAreaAutosize';
import { Button } from 'shared/ui/Button';
import { TemplateType } from 'widgets/TemplateEditor/model/types/TemplateType';
import { generateMessage } from 'widgets/TemplateEditor/model/services/generateMessage';

interface TemplatePreviewProps {
  className?: string;
  onClose?: () => void;
  isOpen: boolean;
  arrVarNames: string[];
  template: TemplateType;
}

export const TemplatePreview = memo((props: TemplatePreviewProps) => {
  const { onClose, isOpen, arrVarNames, template } = props;
  const [needModalClose, setNeedModalClose] = useState(false);
  const resetNeedModalClose = useCallback(() => {
    setNeedModalClose(false);
  }, []);
  const cancelHandle = useCallback(() => {
    setNeedModalClose(true);
  }, []);
  const getInitValues = (arrVarNames: string[]) => {
    const initValues: Record<string, string> = {};
    arrVarNames.forEach((item) => {
      initValues[item] = '';
    });
    return initValues;
  };

  const [values, setValues] = useState(getInitValues(arrVarNames));
  const message = generateMessage(template, values);

  const inputs = useMemo(
    () => (values: Record<string, string>) => {
      const onChangeHandler = (key: string) => (value: string) => {
        setValues({ ...values, [key]: value });
      };
      const inputs = Object.entries(values).map(([key, value]) => {
        return (
          <Input
            placeholder={key}
            value={value}
            onChange={onChangeHandler(key)}
            key={key}
          />
        );
      });
      return inputs;
    },
    [],
  );

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      needModalClose={needModalClose}
      resetNeedModalClose={resetNeedModalClose}
    >
      <VStack gap="8" align="center">
        <Text title="Message Preview" />
        <TextAreaAutosize readOnly value={message} />
        <HStack wrap gap="8">
          <Text text="Variables: " />
          {inputs(values)}
        </HStack>
        <Button onClick={cancelHandle}>Close</Button>
      </VStack>
    </Modal>
  );
});
