import { GetServerSideProps } from "next";
import { NavBar, PageFrame } from "../../components";

interface DashboardPageProps {
  role: string;
}

const DashboardPage = ({ role }: DashboardPageProps) => {
  return (
    <>
      <NavBar role={role} />
      <PageFrame>DashBoard</PageFrame>
    </>
  );
};
export default DashboardPage;

export const getServerSideProps: GetServerSideProps<
  DashboardPageProps
> = async ({ req, res }) => {
  let response;

  response = await fetch("http://localhost:3000/api/v1/getSession", {
    method: "POST",
    headers: req.headers as HeadersInit,
  });
  if (response.redirected) {
    res.writeHead(302, { Location: response.url });
    res.end();
    return {
      props: {} as DashboardPageProps,
    };
  }
  const session = await response.json();
  if (session.role != "admin" && session.role != "manager") {
    res.writeHead(302, { Location: "/" });
    res.end();
    return {
      props: {} as DashboardPageProps,
    };
  }

  return {
    props: { role: session.role },
  };
};
