import { useRouter } from 'next/router';
import { useState } from 'react';

import { AlertBoxTop } from '../components';

const LoginPage = ({}) => {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlertBoxTop, setShowAlertBoxTop] = useState(false);

    const submitHandler = async (event) => {
        event.preventDefault();

        const res = await fetch('/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (res.status === 200) {
            router.push('/');
        }
        if (res.status === 403) {
            setShowAlertBoxTop(true);
        }
    };

    return (
        <div className="w-full flex flex-wrap">
            <AlertBoxTop
                isShow={showAlertBoxTop}
                className="bg-red-500"
                text="ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง!"
                onClick={() => {
                    setShowAlertBoxTop(false);
                }}
            />
            <div className="w-full md:w-1/2 flex flex-col">
                <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                    <p className="text-center text-4xl font-bold ">ยินดีต้อนรับเข้าสู่ ระบบลงเวลา</p>
                    <form className="flex flex-col pt-3 md:pt-8" onSubmit={submitHandler}>
                        <div className="flex flex-col pt-4">
                            <label className="text-lg">ชื่อผู้ใช้</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none"
                                name="username"
                                type="username"
                                value={username}
                                onChange={(event) => {
                                    setUsername(event.target.value);
                                }}
                                required
                            />
                        </div>
                        <div className="flex flex-col pt-4">
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

                        <button
                            type="submit"
                            className="p-2 mt-8 text-white text-lg font-bold bg-black rounded hover:bg-gray-800 active:bg-gray-900 focus:outline-none"
                        >
                            เข้าสู่ระบบ
                        </button>
                    </form>
                </div>
            </div>

            <div className="w-1/2 shadow-2xl">
                <img className="object-cover w-full h-screen hidden md:block" src="./login-background.jpg" />
            </div>
        </div>
    );
};
export default LoginPage;
