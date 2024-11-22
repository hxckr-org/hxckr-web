import { ChevronRightIcon } from "@/public/assets/icons";
import Button from "@/app/components/primitives/button";

export const GitPushButton = ({ title }: { title: string }) => {
  return (
    <Button className="flex items-center justify-center bg-purple-primary text-white py-4 text-base rounded-none text-center">
      {title}
      <ChevronRightIcon className="w-4 h-4" />
    </Button>
  );
};
