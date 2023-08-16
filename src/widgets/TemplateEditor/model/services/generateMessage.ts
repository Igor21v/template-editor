import { TemplateType } from '../types/TemplateType';

export const generateMessage = (
  template: TemplateType,
  values: Record<string, string>,
) => {
  let message = '';

  const renderItemBlock = (
    templateBlock: TemplateType,
    nesting: number,
    path: string[],
  ) => {
    let ifResult = false;
    //итерируемся по каждой строке в объекте
    Object.entries(templateBlock).forEach(([field, fieldVal]) => {
      //функция получение стороки с замененными переменными
      const getRowVal = () => {
        let rowVal = fieldVal.value;
        Object.entries(values).forEach(([key, value]) => {
          const regul = new RegExp(`{${key}}`, 'g');
          rowVal = rowVal.replace(regul, value);
        });
        return rowVal;
      };
      if (field === 'IF') {
        if (getRowVal()) {
          ifResult = true;
          console.log('Условие выполнено');
        } else {
          ifResult = false;
          console.log('Условие НЕ выполнено');
        }
      } else if (
        (field === 'THEN' && ifResult) ||
        (field === 'ELSE' && !ifResult) ||
        field === 'AFTER'
      ) {
        message += getRowVal();
        if (fieldVal.next?.length) {
          fieldVal.next.forEach((item: TemplateType, index: number) => {
            const newPath = [...path, field, 'next', `${index}`];
            renderItemBlock(item, nesting + 1, newPath);
          });
        }
      }
    });
  };
  renderItemBlock(template, 0, []);

  return message;
};
