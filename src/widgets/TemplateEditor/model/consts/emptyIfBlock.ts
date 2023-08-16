import { TemplateType } from '../types/TemplateType';
export const createIfBlock = (afterValue = '') => ({
  IF: {
    value: '1',
  },
  THEN: {
    value: '2',
    next: [],
  },
  ELSE: {
    value: '3',
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
    next: [
      {
        IF: {
          value: '4',
        },
        THEN: {
          value: '123',
          next: [
            {
              IF: {
                value: 'tt',
              },
              THEN: {
                value: 'gd',
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
};
