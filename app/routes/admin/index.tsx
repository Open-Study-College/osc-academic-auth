import { Form } from '@remix-run/react';
import { json, redirect } from '@remix-run/server-runtime';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { getUserId } from '~/session.server';

import { useOptionalUser } from '~/utils';

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await getUserId(request);
    if (!userId) return redirect('/');
    return json({});
};

export default function Index() {
    const user = useOptionalUser();
    return (
        <div>
            <h1 className="text-slate-100">This is the admin index page</h1>
            <p className="text-slate-100">Welcome {user?.email}</p>
            <Form action="/logout" method="post">
                <button
                    type="submit"
                    className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                >
                    Logout
                </button>
            </Form>
        </div>
    );
}
