import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { Account } from "../../types";

import AccountTitle from "./AccountTitle";
import AccountItem from "./AccountItem";

interface AccountManagerProps {
  clientRole: string;
  accounts: Account[];
}

const AccountManager = ({ clientRole, accounts }: AccountManagerProps) => {
  const router = useRouter();

  const addHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    router.push(`/manage/addAccount`);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-row my-8 w-full h-14 text-xl font-bold">
        <button
          className="flex w-2/12 justify-center m-2 py-1 px-2 rounded text-white bg-green-500 hover:bg-green-700 active:bg-green-900 focus:outline-none"
          onClick={addHandler}
        >
          เพิ่มบัญชี
        </button>
        <div className="flex w-11/12 justify-end m-2 py-1 px-4 rounded bg-gray-300 text-black">
          จำนวนทั้งหมด {accounts.length} บัญชี
        </div>
      </div>
      <AccountTitle />
      {accounts.map((account, key) => {
        return (
          <AccountItem
            key={key}
            clientRole={clientRole}
            id={account.id}
            name={account.name}
            role={account.role}
            username={account.username}
          />
        );
      })}
    </div>
  );
};
export default AccountManager;
