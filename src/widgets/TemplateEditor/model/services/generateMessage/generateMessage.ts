import { getPropertyFromPath } from 'shared/lib/getPropertyFromPath';
import { stringSplice } from 'shared/lib/stringSplice/stringSplice';
import { TemplateType } from '../../types/TemplateType';

interface Matches {
  path: string[];
  positon: number;
  variable: string;
  newVal: string;
}

/**
 *Функция генерации сообщения
 * @param template шаблон сообщения
 * @param values значения переменных (объект вида {name : value})
 * @param arrVarNames массив имен переменных
 * @returns сгенерированная строка сообщения
 */

export const generateMessage = (
  template: TemplateType,
  values: Record<string, string>,
  arrVarNames: string[],
) => {
  const matches: Matches[] = [];
  let message = '';
  let templateClone = JSON.parse(JSON.stringify(template));

  // Находим переменные в шаблоне
  findMatches(templateClone, 0, []);
  // Заменяем переменные значениями
  changeMatches();
  // Формируем сообщение
  returnMessageFromTemplate(templateClone, 0, []);
  // И возвращаем результат
  return message;

  //функция получение совпадений переменных
  //простая замена регуляркой не подходит, т.к. в данном случае возможно восприятие значений переменных как самих переменных
  function findMatches(
    templateBlock: TemplateType,
    nesting: number,
    path: string[],
  ) {
    //итерируемся по каждой строке в объекте
    Object.entries(templateBlock).forEach(([field, fieldVal]) => {
      let rowVal = fieldVal.value;
      arrVarNames.forEach((variable) => {
        let positon = -1;
        const newVal = values[variable] ?? '';
        // находим совпадения и помещаем в массив matches
        while (
          (positon = rowVal.indexOf(`{${variable}}`, positon + 1)) !== -1
        ) {
          matches.push({ path: [...path, field], positon, variable, newVal });
        }
      });
      if (fieldVal.next?.length) {
        fieldVal.next.forEach((item: TemplateType, index: number) => {
          const newPath = [...path, field, 'next', `${index}`];
          findMatches(item, nesting + 1, newPath);
        });
      }
    });
  }

  //функция получение шаблона с замененными переменными
  function changeMatches() {
    matches.forEach((match, index) => {
      const prop = getPropertyFromPath(match.path, templateClone);
      prop.value = stringSplice(
        prop.value,
        match.positon,
        match.variable.length + 2,
        match.newVal,
      );
      for (let i = index + 1; i < matches.length; i++) {
        // если в строке есть еще совпадения то сдвигаем позицию
        if (String(matches[i].path) === String(match.path)) {
          matches[i].positon =
            matches[i].positon -
            match.variable.length -
            2 +
            match.newVal.length;
        } else break;
      }
    });
  }

  function returnMessageFromTemplate(
    templateBlock: TemplateType,
    nesting: number,
    path: string[],
  ) {
    let ifResult = false;
    //итерируемся по каждой строке в объекте
    Object.entries(templateBlock).forEach(([field, fieldVal]) => {
      const rowVal = fieldVal.value;
      if (field === 'IF') {
        if (rowVal) {
          ifResult = true;
        } else {
          ifResult = false;
        }
      } else if (
        (field === 'THEN' && ifResult) ||
        (field === 'ELSE' && !ifResult) ||
        field === 'AFTER'
      ) {
        message += rowVal;
        if (fieldVal.next?.length) {
          fieldVal.next.forEach((item: TemplateType, index: number) => {
            const newPath = [...path, field, 'next', `${index}`];
            returnMessageFromTemplate(item, nesting + 1, newPath);
          });
        }
      }
    });
  }
};
