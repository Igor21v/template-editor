# Редактор шаблонов сообщений

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

---

В слое Page слайсе [MainPage](/src/pages/MainPage/ui/MainPage.tsx) реализована кнопка вызова редактора. В нем же находится логика сохранения и извлечения данных из localStorage.

Виджет редактора расположен в слое widgets слайсе [TemplateEditor](/src/widgets/TemplateEditor/ui/TemplateEditor/TemplateEditor.tsx).
Cодержит в себе компоненты

- [TopBar](/src/widgets/TemplateEditor/ui/TemplateEditor/TopBar/TopBar.tsx) - Панель кнопок для добавления переменных и условий в редактор.
- [EditorContent](/src/widgets/TemplateEditor/ui/TemplateEditor/EditorContent/EditorContent.tsx) - Содержимое редактора.
- [BottomBar](/src/widgets/TemplateEditor/ui/TemplateEditor/BottomBar/BottomBar.tsx) - Панель кнопок открытия окна предварительного просмотра, сохранения и закрытия редактора.
- [MessagePreview](/src/widgets/TemplateEditor/ui/MessagePreview/MessagePreview.tsx) - Окно предварительного просмотра сообщения.

---

В папке `model/services` виджета TemplateEditor находятся функция по генерации сообщения из шаблона [generateMessage](/src/widgets/TemplateEditor/model/services/generateMessage/generateMessage.ts) и функция создания блока условий [createIfBlock](/src/widgets/TemplateEditor/model/services/createIfBlock.ts) .

### Функция генерации сообщения

`generateMessage` принимает на вход:

- `values` значения переменных, объект вида {name : value}
- `arrVarNames` массив имен переменных
- `template` шаблон сообщения, объект вида

```{
  IF: {
    value: '',
  },
  THEN: {
    value: '',
    next: [],
  },
  ELSE: {
    value: '',
    next: [],
  },
  AFTER: {
    value: '',
    next: [],
  },
}
```

где value - значение поля, next - массив вложенных условий.

Интерфейс объекта шаблона описан в [model/types](/src/widgets/TemplateEditor/model/types/TemplateType.ts)
