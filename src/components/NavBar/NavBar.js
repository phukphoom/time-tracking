import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const NavBar = ({ role }) => {
  const router = useRouter();

  const logoutHandler = async (event) => {
    event.preventDefault();

    Swal.fire({
      icon: "warning",
      title: "ออกจากระบบ",
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
        const response = await fetch("/api/v1/logout", {
          method: "POST",
        });

        if (response.redirected) {
          router.replace(response.url);
        }
      }
    });
  };

  const showNavigator = role == "admin" || role == "manager";
  return (
    <div className="fixed top-0 flex flex-row items-center w-full h-20 px-32 bg-black">
      <Link href="/" legacyBehavior>
        <a className="font-bold bg-white px-6 py-2 rounded hover:bg-gray-500 active:bg-gray-600">
          หน้าหลัก
        </a>
      </Link>
      <Link href={`/profile`} legacyBehavior>
        <a className="font-bold bg-white ml-4 px-6 py-2 rounded hover:bg-gray-500 active:bg-gray-600">
          โปรไฟล์
        </a>
      </Link>
      {showNavigator && (
        <>
          <Link href="/dashboard" legacyBehavior>
            <a className="font-bold bg-white ml-4 px-6 py-2 rounded hover:bg-gray-500 active:bg-gray-600">
              Dashboard
            </a>
          </Link>
          <Link href="/manage" legacyBehavior>
            <a className="font-bold bg-white ml-4 px-6 py-2 rounded hover:bg-gray-500 active:bg-gray-600">
              บัญชีพนักงาน
            </a>
          </Link>
        </>
      )}
      <button
        className="font-bold bg-red-600 text-white ml-auto px-10 py-4 rounded hover:bg-red-500 active:bg-red-700 focus:outline-none"
        onClick={logoutHandler}
      >
        ออกจากระบบ
      </button>
    </div>
  );
};
export default NavBar;
