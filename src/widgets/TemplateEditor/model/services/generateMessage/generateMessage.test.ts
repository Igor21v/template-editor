import { generateMessage } from './generateMessage';

describe('Generate Message', () => {
  it('Shuld return empty message when template is empty', () => {
    const template = getEmtyTemplate();
    const values = {};
    const message = generateMessage(template, values);
    expect(message).toBe('');
  });
});

// constant generation functions

function getEmtyTemplate() {
  return {
    AFTER: {
      value: '',
      next: [],
    },
  };
}
function getItinTemplate() {
  return {
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
  };
}
