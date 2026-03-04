import type { LucideProps } from "lucide-react";
import * as React from "react";

const BtnCurve = (props: LucideProps) => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
<svg {...props} fill="none" viewBox="0 0 447 70">
    <path fill="#fff" d="M1 1h445v69H1z"></path>
    <path
      fill="#F4F4F5"
      d="M0 69V0h447s-.101 41.787 0 69h-5.731c-12.969 0-24.934-7.542-30.061-19.67-7.641-17.837-25.638-29.557-46.55-29.557H83.146c-20.912.101-38.808 11.822-46.449 29.658C31.469 61.458 19.605 69 6.636 69z"
    ></path>
  </svg>
);

export default BtnCurve;
