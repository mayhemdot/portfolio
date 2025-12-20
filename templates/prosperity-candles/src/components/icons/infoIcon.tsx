import { forwardRef, SVGAttributes } from "react";

const InfoIcon = forwardRef<any, SVGAttributes<any>>(({ ...props }, ref) => (
  <svg ref={ref} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12.9575" r="9" stroke="#4A4A4F" />
    <path d="M12 9.05752C12.3314 9.05752 12.6 8.78889 12.6 8.45752C12.6 8.12615 12.3314 7.85752 12 7.85752C11.6686 7.85752 11.4 8.12615 11.4 8.45752C11.4 8.78889 11.6686 9.05752 12 9.05752Z" fill="#222222" stroke="#4A4A4F" strokeWidth="0.2" />
    <path d="M12 17.9575V10.9575" stroke="#4A4A4F" />
  </svg>
));
InfoIcon.displayName = "InfoIcon";

export default InfoIcon;
