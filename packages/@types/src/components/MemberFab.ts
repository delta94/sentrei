import Member from "@sentrei/types/models/Member";
import Space from "@sentrei/types/models/Space";

export default interface Props {
  members: Member.Get[];
  space: Space.Get;
}
