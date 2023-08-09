import { memo } from "react";
import cls from "./TextAreaAutosize.module.css";
import { classNames } from "shared/lib/classNames/classNames";
import ReactTextareaAutosize from "react-textarea-autosize";

interface TextAreaAutosizeProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export const TextAreaAutosize = memo((props: TextAreaAutosizeProps) => {
  const { className, value, onChange, readOnly } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };
  return (
    <ReactTextareaAutosize
      className={classNames(cls.TextAreaAutosize, {}, [className])}
      readOnly={readOnly}
      value={value}
      onChange={onChangeHandler}
      minRows={2}
      cols={40}
      style={{ resize: "none" }}
    />
  );
});
