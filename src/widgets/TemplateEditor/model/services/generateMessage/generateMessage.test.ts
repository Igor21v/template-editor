import { generateMessage } from './generateMessage';

describe('Generate Message', () => {
  it('Shuld return empty message when template is empty', () => {
    const template = getEmtyTemplate();
    const values = {};
    const message = generateMessage(template, values);
    expect(message).toBe('');
  });
  it('Genaerating a message from one string', () => {
    const template = getOneStringTemplate();
    const values = {};
    const message = generateMessage(template, values);
    expect(message).toBe('Test string');
  });
  it('Generating messages with empty variable', () => {
    const template = getTemplate();
    const values = getVars('', '', '', '');
    const message = generateMessage(template, values);
    const expected = `Hi dear friend! I do not know where you work now. I suggest you work in our company.
Waiting for your message)`;
    expect(message).toBe(expected);
  });
  it('Generating messages with name and lastname', () => {
    const template = getTemplate();
    const values = getVars('Igor', 'Bondarenko', '', '');
    const message = generateMessage(template, values);
    const expected = `Hi Igor Bondarenko! I do not know where you work now. I suggest you work in our company.
Waiting for your message)`;
    expect(message).toBe(expected);
  });
  it('Generating messages when all fields are filled in', () => {
    const template = getTemplate();
    const values = getVars(
      'Igor',
      'Bondarenko',
      '"Horns and Hooves"',
      'Engineer',
    );
    const message = generateMessage(template, values);
    const expected = `Hi Igor Bondarenko! I know that you work for the company "Horns and Hooves" in the position of Engineer. I suggest you work in our company.
Waiting for your message)`;
    expect(message).toBe(expected);
  });
});

// constant generation functions
function getVars(
  firstname: string,
  lastname: string,
  company: string,
  position: string,
) {
  return {
    firstname: firstname,
    lastname: lastname,
    company: company,
    position: position,
  };
}

function getEmtyTemplate() {
  return {
    AFTER: {
      value: '',
      next: [],
    },
  };
}
function getOneStringTemplate() {
  return {
    AFTER: {
      value: 'Test string',
      next: [],
    },
  };
}
function getTemplate() {
  return {
    AFTER: {
      value: 'Hi ',
      next: [
        {
          IF: { value: '{firstname}' },
          THEN: {
            value: '{firstname}',
            next: [
              {
                IF: { value: '{lastname}' },
                THEN: { value: ' {lastname}', next: [] },
                ELSE: { value: '', next: [] },
                AFTER: { value: '!', next: [] },
              },
            ],
          },
          ELSE: { value: 'dear friend!', next: [] },
          AFTER: { value: '', next: [] },
        },
        {
          IF: { value: '{company}' },
          THEN: {
            value: ' I know that you work for the company {company}',
            next: [
              {
                IF: { value: '{position}' },
                THEN: { value: ' in the position of {position}. ', next: [] },
                ELSE: { value: '. ', next: [] },
                AFTER: { value: '', next: [] },
              },
            ],
          },
          ELSE: {
            value: '',
            next: [
              {
                IF: { value: '{position}' },
                THEN: {
                  value:
                    ' I am knowing that you work for the position {position}',
                  next: [],
                },
                ELSE: {
                  value: ' I do not know where you work now. ',
                  next: [],
                },
                AFTER: { value: '', next: [] },
              },
            ],
          },
          AFTER: {
            value:
              'I suggest you work in our company.\nWaiting for your message)',
            next: [],
          },
        },
      ],
    },
  };
}
