export default interface Props {
  animate?: boolean;
  animationDelay?: number;
  animationDuration?: number;
  color: "primary" | "secondary" | string;
  initial?: boolean;
  text: string;
  type:
    | "underline"
    | "box"
    | "circle"
    | "highlight"
    | "strike-through"
    | "crossed-off";
}
