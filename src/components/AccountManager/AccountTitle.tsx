const AccountTitle = () => {
    return (
        <div className="flex flex-row items-center w-full h-10 bg-white">
            <div className="flex w-1/12 m-2 py-1 justify-center rounded font-bold text-xl">ID</div>
            <div className="flex w-3/12 m-2 py-1 justify-center rounded font-bold text-xl">ชื่อ - นามสกุล</div>
            <div className="flex w-3/12 m-2 py-1 justify-center rounded font-bold text-xl">สถานะ</div>
            <div className="flex w-3/12 m-2 py-1 justify-center rounded font-bold text-xl">ชื่อผู้ใช้</div>
            <div className="flex w-1/12 m-2"></div>
            <div className="flex w-1/12 m-2"></div>
        </div>
    );
};
export default AccountTitle;
