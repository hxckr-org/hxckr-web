export const BellOutlineIcon = ({
  fill = "#666666",
  className,
  ...props
}: {
  fill?: string;
  className?: string;
  props?: React.SVGProps<SVGSVGElement>;
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M12.857 15.082C14.7202 14.8614 16.5509 14.4217 18.311 13.772C16.8204 12.1208 15.9967 9.9745 16 7.75V7C16 5.4087 15.3678 3.88258 14.2426 2.75736C13.1174 1.63214 11.5913 1 9.99999 1C8.40869 1 6.88257 1.63214 5.75735 2.75736C4.63213 3.88258 3.99999 5.4087 3.99999 7V7.75C4.00301 9.97463 3.17898 12.121 1.68799 13.772C3.42099 14.412 5.24799 14.857 7.14299 15.082M12.857 15.082C10.959 15.3071 9.041 15.3071 7.14299 15.082M12.857 15.082C13.0011 15.5319 13.0369 16.0094 12.9616 16.4757C12.8862 16.942 12.7018 17.384 12.4234 17.7656C12.1449 18.1472 11.7803 18.4576 11.3592 18.6716C10.9381 18.8856 10.4724 18.9972 9.99999 18.9972C9.52761 18.9972 9.06191 18.8856 8.6408 18.6716C8.21968 18.4576 7.85506 18.1472 7.57661 17.7656C7.29816 17.384 7.11375 16.942 7.0384 16.4757C6.96305 16.0094 6.99889 15.5319 7.14299 15.082"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BellSolidIcon = ({
  fill = "#7762FF",
  className,
  ...props
}: {
  fill?: string;
  className?: string;
  props?: React.SVGProps<SVGSVGElement>;
}) => {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M17.7936 14.4944C17.2733 13.5981 16.4999 11.0622 16.4999 7.75C16.4999 5.76088 15.7097 3.85322 14.3032 2.4467C12.8967 1.04018 10.989 0.25 8.99989 0.25C7.01077 0.25 5.10311 1.04018 3.69659 2.4467C2.29007 3.85322 1.49989 5.76088 1.49989 7.75C1.49989 11.0631 0.725515 13.5981 0.205202 14.4944C0.072331 14.7222 0.0018909 14.9811 0.000985404 15.2449C7.99065e-05 15.5086 0.0687412 15.768 0.200045 15.9967C0.331349 16.2255 0.520652 16.4156 0.748864 16.5478C0.977075 16.6801 1.23613 16.7498 1.49989 16.75H5.32583C5.49886 17.5967 5.95904 18.3577 6.62852 18.9042C7.29799 19.4507 8.13568 19.7492 8.99989 19.7492C9.8641 19.7492 10.7018 19.4507 11.3713 18.9042C12.0407 18.3577 12.5009 17.5967 12.674 16.75H16.4999C16.7636 16.7496 17.0225 16.6798 17.2506 16.5475C17.4787 16.4151 17.6678 16.225 17.799 15.9963C17.9302 15.7676 17.9988 15.5083 17.9979 15.2446C17.9969 14.9809 17.9265 14.7222 17.7936 14.4944ZM8.99989 18.25C8.53472 18.2499 8.08103 18.1055 7.70126 17.8369C7.3215 17.5683 7.03432 17.1886 6.87927 16.75H11.1205C10.9655 17.1886 10.6783 17.5683 10.2985 17.8369C9.91875 18.1055 9.46506 18.2499 8.99989 18.25Z"
        fill={fill}
      />
    </svg>
  );
};
