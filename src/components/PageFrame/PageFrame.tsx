import { ReactNode } from "react";

interface PageFrameProps {
  children: ReactNode;
}

const PageFrame = ({ children }: PageFrameProps) => {
  return (
    <div className="flex flex-col justify-center items-center mt-20 mx-auto pt-16 w-8/12">
      {children}
    </div>
  );
};
export default PageFrame;
