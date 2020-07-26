import Member from "@sentrei/types/models/Member";

export default interface Props {
  open: boolean;
  onClose?:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  collection: Member.Collections;
  id: string;
  userId: string;
}
