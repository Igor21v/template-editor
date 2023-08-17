import { TemplateType } from '../types/TemplateType';
export const createIfBlock = (afterValue = '') => ({
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
    value: afterValue,
    next: [],
  },
});

export const initTemplate: TemplateType = {
  AFTER: {
    value: '',
    next: [],
  },
};

/* export const initTemplate: TemplateType = {
  AFTER: {
    value: 'Привет ',
    next: [
      {
        IF: {
          value: '{firstname}',
        },
        THEN: {
          value: '{firstname}',
          next: [
            {
              IF: {
                value: '{lastname}',
              },
              THEN: {
                value: '{lastname}',
                next: [],
              },
              ELSE: {
                value: '222',
                next: [],
              },
              AFTER: {
                value: '222',
                next: [],
              },
            },
            {
              IF: {
                value: 'g',
              },
              THEN: {
                value: 'nn',
                next: [],
              },
              ELSE: {
                value: '222',
                next: [],
              },
              AFTER: {
                value: 'vvvc',
                next: [],
              },
            },
          ],
        },
        ELSE: {
          value: '222xx',
          next: [],
        },
        AFTER: {
          value: '222ffv',
          next: [],
        },
      },
    ],
  },
}; */
