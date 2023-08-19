import { generateMessage } from './generateMessage';

describe('Generate Message', () => {
  it('Shuld return empty message when template is empty', () => {
    const template = getEmtyTemplate();
    const values = {};
    const arrVarNames = Object.keys(values);
    const message = generateMessage(template, values, arrVarNames);
    expect(message).toBe('');
  });
  it('Genaerating a message from one string', () => {
    const template = getOneStringTemplate();
    const values = {};
    const arrVarNames = Object.keys(values);
    const message = generateMessage(template, values, arrVarNames);
    expect(message).toBe('Test string');
  });

  it('Generating messages with variable', () => {
    const template = getTemplateOneVar();
    const values = { firstname: 'Igor' };
    const arrVarNames = ['firstname'];
    const message = generateMessage(template, values, arrVarNames);
    const expected = `Hi Igor`;
    expect(message).toBe(expected);
  });
  it('Generating messages without a field in values', () => {
    const template = getTemplateOneVar();
    const values = {};
    const arrVarNames = ['firstname'];
    const message = generateMessage(template, values, arrVarNames);
    const expected = `Hi `;
    expect(message).toBe(expected);
  });
  it('Generating messages with an unknown variable', () => {
    const template = getTemplateOneVar();
    const values = {};
    const arrVarNames: string[] = [];
    const message = generateMessage(template, values, arrVarNames);
    const expected = `Hi {firstname}`;
    expect(message).toBe(expected);
  });

  it('Generating messages with two variables in string, value variable as name of variable', () => {
    const template = getTwoVarsInStringTemplate();
    const values = { firstname: '{lastname}', lastname: 'Olia' };
    const arrVarNames = ['firstname', 'lastname'];
    const message = generateMessage(template, values, arrVarNames);
    const expected = `{lastname}Olia`;
    expect(message).toBe(expected);
  });

  it('Generating messages with empty variable', () => {
    const template = getTemplateManyVars();
    const values = getVars('', '', '', '');
    const arrVarNames = Object.keys(values);
    const message = generateMessage(template, values, arrVarNames);
    const expected = `Hi dear friend! I do not know where you work now. I suggest you work in our company.
Waiting for your message)`;
    expect(message).toBe(expected);
  });
  it('Generating messages with name and lastname', () => {
    const template = getTemplateManyVars();
    const values = getVars('Igor', 'Bondarenko', '', '');
    const arrVarNames = Object.keys(values);
    const message = generateMessage(template, values, arrVarNames);
    const expected = `Hi Igor Bondarenko! I do not know where you work now. I suggest you work in our company.
Waiting for your message)`;
    expect(message).toBe(expected);
  });
  it('Generating messages when all fields are filled in', () => {
    const template = getTemplateManyVars();
    const values = getVars(
      'Igor',
      'Bondarenko',
      '"Horns and Hooves"',
      'Engineer',
    );
    const arrVarNames = Object.keys(values);
    const message = generateMessage(template, values, arrVarNames);
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
function getTwoVarsInStringTemplate() {
  return {
    AFTER: {
      value: '{firstname}{lastname}',
      next: [],
    },
  };
}
function getTemplateOneVar() {
  return { AFTER: { value: 'Hi {firstname}', next: [] } };
}
function getTemplateManyVars() {
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
