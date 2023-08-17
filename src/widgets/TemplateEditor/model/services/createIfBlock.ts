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

export const emptyTemplate: TemplateType = {
  AFTER: {
    value: '',
    next: [],
  },
};
