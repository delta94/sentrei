import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";

export default interface Props {
  color: string;
  left: boolean;
  img: JSX.Element;
  subTitle: string;
  titleOne: string;
  titleTwo: string;
  titleThree: string;
  type: "underline" | "box" | "circle" | "highlight";
  width: Breakpoint;
}
