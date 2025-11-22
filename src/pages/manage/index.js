import { NavBar, PageFrame, AccountManager } from "../../components";

const ManagePage = ({ role, accounts }) => {
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

export const getServerSideProps = async ({ req, res }) => {
  let response;

  response = await fetch("http://localhost:3000/api/v1/getSession", {
    method: "POST",
    headers: req.headers,
  });
  if (response.redirected) {
    res.writeHead(302, { Location: response.url });
    res.end();
    return {
      props: {},
    };
  }
  const session = await response.json();
  if (session.role != "admin" && session.role != "manager") {
    res.writeHead(302, { Location: "/" });
    res.end();
    return {
      props: {},
    };
  }

  response = await fetch("http://localhost:3000/api/v1/accounts", {
    method: "GET",
    headers: req.headers,
  });
  const accounts = await response.json();

  return {
    props: { role: session.role, accounts: accounts },
  };
};
