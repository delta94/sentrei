import Member from "@sentrei/types/models/Member";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";

export default interface Props {
  members: Member.Get[];
  rooms: Room.Get[];
  space: Space.Get | null;
}
