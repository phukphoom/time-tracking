import { NavBar, PageFrame, AccountAdderForm } from '../../../components';

const AddAccountPage = ({ role, accounts }) => {
    return (
        <React.Fragment>
            <NavBar role={role} />
            <PageFrame>
                <AccountAdderForm accounts={accounts} />
            </PageFrame>
        </React.Fragment>
    );
};
export default AddAccountPage;

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
    if (session.role != 'admin' && session.role != 'manager') {
        res.writeHead(302, { Location: '/' });
        res.end();
        return {
            props: {},
        };
    }

    response = await fetch('http://localhost:3000/api/v1/accounts', {
        method: 'GET',
        headers: req.headers,
    });
    const accounts = await response.json();

    return {
        props: { role: session.role, accounts: accounts },
    };
};
