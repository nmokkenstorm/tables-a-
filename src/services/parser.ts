export const parse = (cellvalue: string): string => {
  if (cellvalue.charAt(0) != '=') {
    return cellvalue;
  }

  return eval(cellvalue.substr(1));
};
