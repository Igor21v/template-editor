export const getPropertyFromPath = (path: string[], obj: any) =>
  path.reduce((acc: any, el) => (acc = acc[el]), obj);
