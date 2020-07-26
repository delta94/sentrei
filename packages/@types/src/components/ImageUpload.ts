export default interface Props {
  hideImg?: boolean;
  id?: string;
  img?: string | null;
  label?: string;
  size?: string;
  onSave: (url: string) => void;
}
