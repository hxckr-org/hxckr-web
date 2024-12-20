export const ArrowLeftIcon = ({
  fill = "currentColor",
  className,
  ...props
}: {
  fill?: string;
  className?: string;
  props?: React.SVGProps<SVGSVGElement>;
}) => {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M11.9999 5.00024C11.9999 5.11628 11.9472 5.22756 11.8535 5.3096C11.7597 5.39165 11.6325 5.43774 11.4999 5.43774H1.70678L5.35366 8.62821C5.40011 8.66886 5.43696 8.71712 5.4621 8.77023C5.48724 8.82334 5.50018 8.88026 5.50018 8.93774C5.50018 8.99523 5.48724 9.05215 5.4621 9.10526C5.43696 9.15837 5.40011 9.20663 5.35366 9.24728C5.3072 9.28792 5.25205 9.32017 5.19135 9.34216C5.13066 9.36416 5.0656 9.37549 4.99991 9.37549C4.93421 9.37549 4.86915 9.36416 4.80846 9.34216C4.74776 9.32017 4.69261 9.28792 4.64615 9.24728L0.146155 5.30977C0.0996668 5.26914 0.0627873 5.22089 0.0376252 5.16778C0.012463 5.11467 -0.000488281 5.05774 -0.000488281 5.00024C-0.000488281 4.94275 0.012463 4.88582 0.0376252 4.83271C0.0627873 4.7796 0.0996668 4.73134 0.146155 4.69071L4.64615 0.753212C4.73997 0.671119 4.86722 0.625 4.99991 0.625C5.13259 0.625 5.25984 0.671119 5.35366 0.753212C5.44748 0.835305 5.50018 0.946647 5.50018 1.06274C5.50018 1.17884 5.44748 1.29018 5.35366 1.37227L1.70678 4.56274H11.4999C11.6325 4.56274 11.7597 4.60884 11.8535 4.69088C11.9472 4.77293 11.9999 4.88421 11.9999 5.00024Z"
        fill={fill}
      />
    </svg>
  );
};
