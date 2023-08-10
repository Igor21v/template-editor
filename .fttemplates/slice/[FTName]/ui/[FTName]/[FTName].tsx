import { memo } from 'react';
import cls from './<FTName>.module.css';
import { classNames } from 'shared/lib/classNames/classNames';

interface <FTName>Props {
    className ?: string;
}

export const <FTName> = memo((props: <FTName>Props) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(cls.<FTName>, {}, [className])} >
           
        </div>
    );
});
