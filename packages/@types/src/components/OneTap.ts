import User from "@sentrei/types/models/User";

interface OneTap {
  user: User.Get | undefined | null;
  delay?: boolean;
}

export default OneTap;
