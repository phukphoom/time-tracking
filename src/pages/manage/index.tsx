import { GetServerSideProps } from "next";
import { NavBar, PageFrame, AccountManager } from "../../components";
import { Account } from "../../types";

interface ManagePageProps {
  role: string;
  accounts: Account[];
}

const ManagePage = ({ role, accounts }: ManagePageProps) => {
  return (
    <>
      <NavBar role={role} />
      <PageFrame>
        <AccountManager clientRole={role} accounts={accounts} />
      </PageFrame>
    </>
  );
};
export default ManagePage;

export const getServerSideProps: GetServerSideProps<ManagePageProps> = async ({
  req,
  res,
}) => {
  let response;

  response = await fetch("http://localhost:3000/api/v1/getSession", {
    method: "POST",
    headers: req.headers as HeadersInit,
  });
  if (response.redirected) {
    res.writeHead(302, { Location: response.url });
    res.end();
    return {
      props: {} as ManagePageProps,
    };
  }
  const session = await response.json();
  if (session.role != "admin" && session.role != "manager") {
    res.writeHead(302, { Location: "/" });
    res.end();
    return {
      props: {} as ManagePageProps,
    };
  }

  response = await fetch("http://localhost:3000/api/v1/accounts", {
    method: "GET",
    headers: req.headers as HeadersInit,
  });
  const accounts = await response.json();

  return {
    props: { role: session.role, accounts: accounts },
  };
};
