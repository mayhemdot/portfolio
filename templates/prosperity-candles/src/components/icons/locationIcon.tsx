import { FC } from "react";
import { LucideProps } from "lucide-react";

const LocationIcon: FC = (props: LucideProps) => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M19.5 12.9575C19.5 17.9755 14.0117 21.3602 12.4249 22.2339C12.1568 22.3815 11.8432 22.3815 11.5751 22.2339C9.98831 21.3602 4.5 17.9755 4.5 12.9575C4.5 8.45752 8.13401 5.45752 12 5.45752C16 5.45752 19.5 8.45752 19.5 12.9575Z" stroke="#4A4A4F" />
      <circle cx="12" cy="12.9575" r="3.5" stroke="#4A4A4F" />
    </svg>
  );
};

export default LocationIcon;
