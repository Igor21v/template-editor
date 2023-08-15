export interface itemIfBlockType {
  value: string;
  next?: IfBlocksObjType[];
}

export interface IfBlocksObjType {
  IF?: itemIfBlockType;
  THEN?: itemIfBlockType;
  ELSE?: itemIfBlockType;
  AFTER?: itemIfBlockType;
}

export const createBlock = (afterValue = '') => ({
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

export const initIfBlocksObj: IfBlocksObjType = {
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

/* export const initIfBlocksObj: IfBlocksObjType = {
  AFTER: {
    value: '222',
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
                ],
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
