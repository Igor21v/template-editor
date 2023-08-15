import { memo, useRef } from 'react';
import cls from './TextAreaAutosize.module.css';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import ReactTextareaAutosize from 'react-textarea-autosize';

interface TextAreaAutosizeProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  onFocus?: () => void;
  onSelect?: (selectionStart?: number, selectionEnd?: number) => void;
  autoFocus?: boolean;
}

export const TextAreaAutosize = memo((props: TextAreaAutosizeProps) => {
  const { className, value, onChange, readOnly, onFocus, onSelect, autoFocus } =
    props;
  const areaRef = useRef<HTMLTextAreaElement>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };
  const selectHandler = () => {
    onSelect?.(areaRef.current?.selectionStart, areaRef.current?.selectionEnd);
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
      onSelect={selectHandler}
      ref={areaRef}
      autoFocus={autoFocus}
    />
  );
});
