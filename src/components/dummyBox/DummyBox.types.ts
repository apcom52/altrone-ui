export interface DummyBoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  width?: string;
  height?: string;
}
