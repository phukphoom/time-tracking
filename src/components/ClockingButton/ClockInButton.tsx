import { MouseEvent } from "react";

interface ClockInButtonProps {
  userId: number;
  disabled: boolean;
}

const ClockInButton = ({ userId, disabled }: ClockInButtonProps) => {
  const onClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log(`${userId} : ClockIn -> ${new Date().getTime()}`);
  };

  return (
    <button
      className={`flex justify-center items-center text-2xl text-white w-64 h-32 rounded-md bg-green-500 ${
        !disabled
          ? "hover:bg-green-600 active:bg-green-700 focus:outline-none"
          : "cursor-not-allowed opacity-25"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      เข้างาน
    </button>
  );
};
export default ClockInButton;
