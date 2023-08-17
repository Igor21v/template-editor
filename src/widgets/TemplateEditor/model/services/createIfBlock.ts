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
