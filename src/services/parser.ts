export const parse = (cellvalue: string): string => {
  if (cellvalue.charAt(0) != '=') {
    return cellvalue;
  }

  // @TODO: don't rely on eval
  return eval(cellvalue.substr(1));
};
