export interface SpoilerProps
  extends React.DetailsHTMLAttributes<HTMLDetailsElement> {
  title: string;
  openedByDefault?: boolean;
}
