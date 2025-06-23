export function isNotBlank(s: string | undefined | null): boolean {
  return s !== undefined && s !== null && s !== '';
}

export function isNotEmpty(a: Array<any>) {
  return a !== undefined && a.length > 0;
}