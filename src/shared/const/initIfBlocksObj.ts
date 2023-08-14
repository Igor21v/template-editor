export interface itemIfBlock {
  value: string;
  next?: IfBlocksObj;
}

export interface IfBlocksObj {
  IF?: itemIfBlock;
  THEN?: itemIfBlock;
  ELSE?: itemIfBlock;
  AFTER?: itemIfBlock;
}

export const initIfBlocksObj: IfBlocksObj = {
  AFTER: {
    value: '222',
    next: {
      IF: {
        value: '4',
      },
      THEN: {
        value: '123',
        next: {
          IF: {
            value: 'g',
          },
          THEN: {
            value: 'nn',
          },
          ELSE: {
            value: '222',
          },
          AFTER: {
            value: 'vvvc',
            next: {
              IF: {
                value: 'tt',
              },
              THEN: {
                value: 'gd',
              },
              ELSE: {
                value: '222',
              },
              AFTER: {
                value: '222',
              },
            },
          },
        },
      },
      ELSE: {
        value: '222xx',
      },
      AFTER: {
        value: '222ffv',
      },
    },
  },
};
