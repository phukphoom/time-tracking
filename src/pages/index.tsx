import { GetServerSideProps } from "next";
import {
  NavBar,
  PageFrame,
  ClockDisplay,
  ClockInButton,
  ClockOutButton,
} from "../components";

interface HomePageProps {
  id: number;
  role: string;
}

const HomePage = ({ id, role }: HomePageProps) => {
  return (
    <>
      <NavBar role={role} />
      <PageFrame>
        <ClockDisplay />
        <div className="flex flex-row justify-center space-x-16 mt-8">
          <ClockInButton userId={id} disabled={false} />
          <ClockOutButton userId={id} disabled={true} />
        </div>
      </PageFrame>
    </>
  );
};
export default HomePage;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({
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
      props: {} as HomePageProps,
    };
  }
  const session = await response.json();

  return {
    props: { id: session.id, role: session.role },
  };
};
