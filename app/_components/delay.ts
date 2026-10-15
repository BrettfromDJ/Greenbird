/** Stagger delay for `.intro`, `.r` and friends. */
export const d = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties
