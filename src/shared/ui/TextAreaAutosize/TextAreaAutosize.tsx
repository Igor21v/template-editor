import { forwardRef, useRef } from 'react';
import cls from './TextAreaAutosize.module.css';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import ReactTextareaAutosize from 'react-textarea-autosize';
import React from 'react';

interface TextAreaAutosizeProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  onFocus?: () => void;
  onSelect?: (selectionStart: number, selectionEnd: number) => void;
  autoFocus?: boolean;
}

/**
 * Компонент растягивающегося TextArea
 * className - стили
 * value - значение
 * onChange - функция изменения значения TextTheme
 * readOnly - только чтение
 * onFocus - колбэк вызываемый при установке фокуса
 * onSelect - колбэк вызываемый при выделении
 * autoFocus - установка фокуса после рендера компонента
 */

export const TextAreaAutosize = forwardRef<
  HTMLTextAreaElement,
  TextAreaAutosizeProps
>((props, ref) => {
  const { className, value, onChange, readOnly, onFocus, onSelect, autoFocus } =
    props;
  /* const areaRef = useRef<HTMLTextAreaElement>(null); */
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };
  const innerRef = useRef<HTMLTextAreaElement | null>(null);
  const selectHandler = () => {
    onSelect?.(
      innerRef.current?.selectionStart || 0,
      innerRef.current?.selectionEnd || 0,
    );
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
      ref={(node) => {
        innerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      autoFocus={autoFocus}
    />
  );
});
