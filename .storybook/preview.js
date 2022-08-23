// commented out until i end up importing the components
// import "/app/styles/dest/main.css";
// import "/app/components/avatar/avatar.css";
// import "/app/components/datepicker/datepicker.css";
// import "/app/components/footer/footer.css";
// import "/app/components/logo/logo.css";
// import "/app/components/nav/nav.css";
// import "/app/components/pagination/pagination.css";

import darkTheme from '../app/theme/darkTheme';
import lightTheme from '../app/theme/lightTheme';
import { ChakraProvider } from '@chakra-ui/react';

import React from 'react';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
    key: 'css',
    prepend: true
});

addDecorator((story) => {
    return (
        <CacheProvider value={cache}>
            <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
        </CacheProvider>
    );
});

export const parameters = {
    chakra: {
        theme: darkTheme
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    },
    backgrounds: {
        default: 'dark',
        values: [
            {
                name: 'dark',
                value: '#272145'
            },
            {
                name: 'light',
                value: '#fff'
            }
        ]
    }
};
