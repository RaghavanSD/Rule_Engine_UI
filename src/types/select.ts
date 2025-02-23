export type SelectProps = {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  className?: string;
  placeholder?:string;
};
