type ClassName = string | boolean | undefined;

export function cls(...classes: ClassName[]) {
  return classes.filter(Boolean).join(' ');
}
