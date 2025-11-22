import { NavBar, PageFrame } from "../../components";

const DashboardPage = ({ role }) => {
  return (
    <>
      <NavBar role={role} />
      <PageFrame>DashBoard</PageFrame>
    </>
  );
};
export default DashboardPage;

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

  return {
    props: { role: session.role },
  };
};
