import { generateMessage } from './generateMessage';
const emptyTemplate = {
  AFTER: {
    value: '',
    next: [],
  },
};

describe('Generate Message', () => {
  it('Shuld return empty message when template is empty', () => {
    const template = emptyTemplate;
    const values = {};
    const message = generateMessage(template, values);
    expect(message).toBe('');
  });
});
