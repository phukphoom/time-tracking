import { NavBar, PageFrame } from '../components';

const HomePage = ({ id, username, role, name }) => {
    return (
        <React.Fragment>
            <NavBar id={id} role={role} />
            <PageFrame>
                <div>Username : {username}</div>
                <div>Role : {role}</div>
                <div>Name : {name}</div>
            </PageFrame>
        </React.Fragment>
    );
};
export default HomePage;

export const getServerSideProps = async ({ req, res }) => {
    let response;

    response = await fetch('http://localhost:3000/api/v1/getSession', {
        method: 'POST',
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

    return {
        props: { id: session.id, username: session.username, role: session.role, name: session.name },
    };
};
