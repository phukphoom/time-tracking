import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const AccountAdderForm = ({ accounts }) => {
    const router = useRouter();

    const [name, setName] = useState('');
    const [role, setRole] = useState('employee');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [isDuplicate, setIsDuplicate] = useState(false);
    const [isMatch, setIsMatch] = useState(true);

    const usernameList = accounts.map((account) => {
        return account.username;
    });
    useEffect(() => {
        if (usernameList.includes(username)) {
            setIsDuplicate(true);
        } else {
            setIsDuplicate(false);
        }
    }, [username]);
    useEffect(() => {
        if (password != rePassword && rePassword != '') {
            setIsMatch(false);
        } else {
            setIsMatch(true);
        }
    }, [password, rePassword]);

    const submitHandler = async (event) => {
        event.preventDefault();

        if (isDuplicate || !isMatch) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบใหม่!',
                position: 'center',
                showConfirmButton: false,
                timer: 5000,
            });
        } else {
            const response = await fetch('/api/v1/accounts/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    role,
                    name,
                }),
            });

            if (response.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'ดำเนินการเพิ่ม',
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
                    title: 'ไม่สามารถดำเนินการเพิ่มได้',
                    timer: 2000,
                    showConfirmButton: false,
                    showCancelButton: false,
                    toast: true,
                    position: 'top',
                });
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <form className="flex flex-col w-5/12" onSubmit={submitHandler}>
                <div>
                    <p className="flex text-4xl font-bold mt-4">ข้อมูลพนักงาน</p>
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
                            <option selected value="employee">
                                employee
                            </option>
                            <option value="manager">manager</option>
                        </select>
                    </div>
                </div>

                <div>
                    <p className="flex text-4xl font-bold mt-10">ข้อมูลบัญชี</p>
                    <div className="flex flex-col">
                        <label className="text-lg">ชื่อผู้ใช้</label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none ${
                                isDuplicate ? 'border-red-500 bg-red-100' : ''
                            }`}
                            name="username"
                            type="text"
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                            required
                        />
                        {isDuplicate && <div className="text-sm text-red-400 pt-2">ไม่สามารถใช้ชื่อผู้ใช้นี้ได้</div>}
                    </div>
                    <div className="flex flex-row justify-between pt-4 space-x-4">
                        <div className="flex flex-col">
                            <label className="text-lg">รหัสผ่าน</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg">รหัสผ่าน (อีกครั้ง)</label>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none ${
                                    isMatch ? '' : 'border-red-500 bg-red-100'
                                }`}
                                name="rePassword"
                                type="password"
                                value={rePassword}
                                onChange={(event) => {
                                    setRePassword(event.target.value);
                                }}
                                required
                            />
                            {!isMatch && <div className="text-sm text-red-400 pt-2">รหัสผ่านไม่ตรงกัน</div>}
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="p-2 mt-8 mb-20 text-white text-lg font-bold rounded-sm bg-green-500 hover:bg-green-700 active:bg-green-900 focus:outline-none"
                    disable = {isDuplicate || !isMatch}
                >
                    เพิ่มบัญชี
                </button>
            </form>
        </div>
    );
};
export default AccountAdderForm;
