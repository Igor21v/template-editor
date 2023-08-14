import { memo } from 'react';
import cls from './TextAreaAutosize.module.css';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import ReactTextareaAutosize from 'react-textarea-autosize';

interface TextAreaAutosizeProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  onFocus?: () => void;
}

export const TextAreaAutosize = memo((props: TextAreaAutosizeProps) => {
  const { className, value, onChange, readOnly, onFocus } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };
  const mods: Mods = {
    [cls.readOnly]: readOnly,
    [cls.canEdit]: !readOnly,
  };
  return (
    <ReactTextareaAutosize
      className={classNames(cls.TextAreaAutosize, mods, [className])}
      readOnly={readOnly}
      value={value}
      onChange={onChangeHandler}
      style={{ resize: 'none' }}
      onFocus={onFocus}
    />
  );
});
