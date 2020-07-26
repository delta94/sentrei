import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";

export default interface Props {
  room: Room.Get;
  space: Space.Get;
}
