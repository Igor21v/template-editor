/**
 * Функция splice для строки
 * @param str изменяемая строка
 * @param index начальный индекс
 * @param count количестов удаляемых элементов
 * @param add добавляемая строка
 * @returns
 */

export function stringSplice(
  str: string,
  index: number,
  count: number,
  add: string,
) {
  // We cannot pass negative indexes directly to the 2nd slicing operation.
  if (index < 0) {
    index = str.length + index;
    if (index < 0) {
      index = 0;
    }
  }

  return str.slice(0, index) + (add || '') + str.slice(index + count);
}
