import { Form } from '@remix-run/react';
import { useLoaderData, useLocation, useSubmit } from '@remix-run/react';

import { getColorScheme } from '~/cookie';
import type { LoaderFunction } from '@remix-run/server-runtime';
import FormToggle from '~/components/FormToggle';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export const loader: LoaderFunction = async ({ request }) => {
    const colorScheme = await getColorScheme(request);
    return { colorScheme };
};

export default function Index() {
    const props = useLoaderData() ?? undefined;
    const colorScheme = props ? props.colorScheme : undefined;
    const submit = useSubmit();
    const location = useLocation();
    return (
        <div>
            <h1>This is the index page</h1>
            <Form action="/logout" method="post">
                <button type="submit">Logout</button>
            </Form>
            {colorScheme && (
                <FormToggle
                    leftIcon={<MoonIcon color={'secondary'} margin={2} />}
                    rightIcon={<SunIcon color={'secondary'} margin={2} />}
                    isChecked={colorScheme === 'light' ? true : false}
                    onToggle={() => {
                        const formData = new FormData();
                        formData.set('pathname', location.pathname);
                        submit(formData, {
                            method: 'post',
                            action: '/actions/changeTheme'
                        });
                    }}
                    id="color-mode-toggle"
                />
            )}
        </div>
    );
}
