export default interface Props {
  children: JSX.Element;
  icon: JSX.Element;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  title: string;
}
