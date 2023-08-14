export interface itemIfBlockType {
  value: string;
  next?: IfBlocksObjType;
}

export interface IfBlocksObjType {
  IF?: itemIfBlockType;
  THEN?: itemIfBlockType;
  ELSE?: itemIfBlockType;
  AFTER?: itemIfBlockType;
}

export const emptyIfBlock = {
  IF: {
    value: '1',
  },
  THEN: {
    value: '2',
  },
  ELSE: {
    value: '3',
  },
  AFTER: {
    value: '4',
  },
};

export const initIfBlocksObj: IfBlocksObjType = {
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
