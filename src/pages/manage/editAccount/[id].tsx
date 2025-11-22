import { NavBar, PageFrame, AccountEditerForm } from '../../../components';

const editAccountPage = ({ role, editedAccount }) => {
    console.log({ role, editedAccount });
    return (
        <React.Fragment>
            <NavBar role={role} />
            <PageFrame>
                <AccountEditerForm editedAccount={editedAccount} />
            </PageFrame>
        </React.Fragment>
    );
};
export default editAccountPage;

export const getServerSideProps = async ({ req, res, query }) => {
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

    response = await fetch(`http://localhost:3000/api/v1/accounts/${query.id}`, {
        method: 'GET',
        headers: req.headers,
    });
    let editedAccount = await response.json();
    editedAccount = { ...editedAccount, id: query.id };

    return {
        props: { role: session.role, editedAccount: editedAccount },
    };
};
