declare type brackets = "left" | "right" | "top" | "bottom";

export default interface Props {
  animate?: boolean;
  animationDelay?: number;
  animationDuration?: number;
  brackets?: brackets | brackets[];
  color: "primary" | "primary-light" | "secondary" | "secondary-light" | string;
  padding?: number | [number, number, number, number] | [number, number];
  initial?: boolean;
  iterations?: number;
  strokeWidth?: number;
  text: string;
  type:
    | "bracket"
    | "underline"
    | "box"
    | "circle"
    | "highlight"
    | "strike-through"
    | "crossed-off";
}
