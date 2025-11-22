import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';

const AccountEditerForm = ({ editedAccount }) => {
    const router = useRouter();

    const [name, setName] = useState(editedAccount.name);
    const [role, setRole] = useState(editedAccount.role);

    const submitHandler = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/v1/accounts/updateProfile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id:editedAccount.id,
                role,
                name,
            }),
        });

        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'ดำเนินการบันทึก',
                timer: 2000,
                showConfirmButton: false,
                showCancelButton: false,
                toast: true,
                position: 'top',
            });
            router.push('/manage');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถดำเนินการบันทึกได้',
                timer: 2000,
                showConfirmButton: false,
                showCancelButton: false,
                toast: true,
                position: 'top',
            });
        }
    };

    const changePasswordHandler = async (event) => {
        event.preventDefault();
        Swal.fire({
            icon: 'warning',
            text: 'กรุณากรอก รหัสผ่านใหม่ของบัญชีนี้',
            input: 'password',
            position: 'center',
            inputPlaceholder: 'รหัสผ่านใหม่',
            allowEnterKey: false,
            focusConfirm: false,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            confirmButtonColor: '#48bb78',
            cancelButtonText: 'ยกเลิก',
            cancelButtonColor: '#f56565',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const password = result.value;
                const response = await fetch('/api/v1/accounts/changePassword', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: editedAccount.id,
                        password,
                    }),
                });

                if (response.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: `ดำเนินการเปลี่ยนรหัสผ่าน`,
                        timer: 2000,
                        showConfirmButton: false,
                        showCancelButton: false,
                        toast: true,
                        position: 'top',
                    }).then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: `เปลี่ยนรหัสผ่านบัญชี [ID : ${editedAccount.id}]`,
                            html: `ชื่อผู้ใช้ : ${editedAccount.username} <br> รหัสผ่านใหม่ : ${password}`,
                            position: 'center',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                        });
                        router.push('/manage');
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'ไม่สามารถดำเนินการเปลี่ยนรหัสผ่านได้',
                        timer: 2000,
                        showConfirmButton: false,
                        showCancelButton: false,
                        toast: true,
                        position: 'top',
                    });
                }
            }
        });
    };

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <form className="flex flex-col w-5/12" onSubmit={submitHandler}>
                <div>
                    <p className="flex text-4xl font-bold mt-10 ">ข้อมูลพนักงาน</p>
                    <p className="flex text-2xl font-bold mb-4">
                        [ {editedAccount.id} : {editedAccount.username} ]
                    </p>
                    <div className="flex flex-col">
                        <label className="text-lg">ชื่อ-นามสกุล</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="flex flex-col pt-4">
                        <label className="text-lg">สถานะ</label>
                        <select
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none"
                            name="role"
                            onChange={(event) => {
                                setRole(event.target.value);
                            }}
                            required
                        >
                            <option selected={editedAccount.role == 'employee'} value="employee">
                                employee
                            </option>
                            <option selected={editedAccount.role == 'manager'} value="manager">
                                manager
                            </option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="p-2 mt-8 text-white text-lg rounded-sm font-bold bg-green-500 hover:bg-green-700 active:bg-green-900 focus:outline-none"
                >
                    บันทึก
                </button>
                <button
                    type="button"
                    className="p-2 mt-2 mb-20 text-red-500 text-lg rounded-sm font-bold border-2 border-red-500 bg-red-white hover:bg-red-100 active:bg-red-200 focus:outline-none"
                    onClick={changePasswordHandler}
                >
                    เเก้ไขรหัสผ่าน
                </button>
            </form>
        </div>
    );
};
export default AccountEditerForm;
