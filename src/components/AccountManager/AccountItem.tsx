import { useRouter } from "next/router";
import { MouseEvent } from "react";
import Swal from "sweetalert2";

interface AccountItemProps {
  clientRole: string;
  id: number;
  name: string;
  role: string;
  username: string;
}

type RoleLevel = {
  [key: string]: number;
};

const AccountItem = ({
  clientRole,
  id,
  name,
  role,
  username,
}: AccountItemProps) => {
  const router = useRouter();

  const editHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    router.push(`/manage/editAccount/${id}`);
  };

  const deleteHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    Swal.fire({
      icon: "warning",
      title: "ยืนยันที่จะลบบัญชีนี้",
      text: `ID ${id} : ${name}`,
      position: "center",
      allowEnterKey: false,
      focusConfirm: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      confirmButtonColor: "#48bb78",
      cancelButtonText: "ยกเลิก",
      cancelButtonColor: "#f56565",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch("/api/v1/accounts/remove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        });

        if (response.status == 200) {
          Swal.fire({
            icon: "success",
            title: "ดำเนินการลบ",
            timer: 2000,
            showConfirmButton: false,
            showCancelButton: false,
            toast: true,
            position: "top",
          });
          router.reload();
        } else {
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถดำเนินการลบได้",
            timer: 2000,
            showConfirmButton: false,
            showCancelButton: false,
            toast: true,
            position: "top",
          });
        }
      }
    });
  };

  const levelRole: RoleLevel = { admin: 3, manager: 2, employee: 1 };
  const canManage = levelRole[clientRole] > levelRole[role];
  return (
    <div className="flex flex-row items-center w-full h-10 bg-white">
      <div
        className={`flex w-1/12 justify-center m-2 py-1 justify-center rounded ${
          role == "admin" || role == "manager" ? "bg-gray-400" : "bg-gray-200"
        }`}
      >
        {id}
      </div>
      <div
        className={`flex w-3/12 justify-center m-2 py-1 justify-center rounded ${
          role == "admin" || role == "manager" ? "bg-gray-400" : "bg-gray-200"
        }`}
      >
        {name}
      </div>
      <div
        className={`flex w-3/12 justify-center m-2 py-1 justify-center rounded ${
          role == "admin" || role == "manager" ? "bg-gray-400" : "bg-gray-200"
        }`}
      >
        {role}
      </div>
      <div
        className={`flex w-3/12 justify-center m-2 py-1 justify-center rounded ${
          role == "admin" || role == "manager" ? "bg-gray-400" : "bg-gray-200"
        }`}
      >
        {username}
      </div>
      <button
        className={`flex w-1/12 m-2 py-1 justify-center rounded text-white bg-blue-600 ${
          canManage
            ? "hover:bg-blue-300 active:bg-blue-500 focus:outline-none"
            : "cursor-not-allowed opacity-25 "
        }`}
        onClick={editHandler}
        disabled={!canManage}
      >
        เเก้ไข
      </button>
      <button
        className={`flex w-1/12 m-2 py-1 justify-center rounded text-white bg-red-600 ${
          canManage
            ? "hover:bg-red-300 active:bg-red-500 focus:outline-none"
            : "cursor-not-allowed opacity-25 "
        }`}
        onClick={deleteHandler}
        disabled={!canManage}
      >
        ลบ
      </button>
    </div>
  );
};
export default AccountItem;
