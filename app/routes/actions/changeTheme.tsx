import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { colorSchemeCookie, getColorScheme } from '~/cookie';

export const action: ActionFunction = async ({ request }) => {
    const currentColorScheme = await getColorScheme(request);
    const newColorScheme = currentColorScheme === 'light' ? 'dark' : 'light';

    const pathname = (await request.formData()).get('pathname')?.toString();

    return redirect(pathname ?? '/', {
        headers: {
            'Set-Cookie': await colorSchemeCookie.serialize(newColorScheme)
        }
    });
};
