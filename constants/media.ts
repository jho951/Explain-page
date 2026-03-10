const SCROLL_DELTA = 5;
const MOBILE_BREAKPOINT = 768;
const PC_BREAKPOINT = 1024;

const DIGITS: Record<'0' | '4', string[]> = {
  '4': ['1001', '1001', '1001', '1111', '0001', '0001', '0001'],
  '0': ['0110', '1001', '1001', '1001', '1001', '1001', '0110'],
};

export { SCROLL_DELTA, MOBILE_BREAKPOINT, PC_BREAKPOINT, DIGITS };
