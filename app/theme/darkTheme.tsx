import { extendTheme } from '@chakra-ui/react';
import colours from './global/colours';

const darkTheme = extendTheme(colours, {
    shadows: { outline: 'none' },
    colors: {
        primary: 'var(--colour-navy)',
        secondary: 'green',
        tertiary: 'var(--colour-black)',
        quaternary: 'var(--colour-grey)'
    },
    components: {
        Button: {
            variants: {
                primary: {
                    _hover: {
                        bg: 'tertiary',
                        color: 'secondary'
                    },
                    bg: 'primary',
                    color: 'secondary',
                    borderColor: 'secondary',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    boxShadow:
                        '0 2.8px 2.2px rgb(0 0 0 / 3.4%), 0 6.7px 5.3px rgb(0 0 0 / 4.8%), 0 12.5px 10px rgb(0 0 0 / 6%), 0 22.3px 17.9px rgb(0 0 0 / 7.2%), 0 41.8px 33.4px rgb(0 0 0 / 8.6%), 0 100px 80px rgb(0 0 0 / 12%)'
                }
            }
        },
        Link: {
            baseStyle: {
                _focus: {
                    boxShadow: 'none'
                },
                _hover: {
                    textDecoration: 'none'
                }
            }
        }
    }
});

// as default export
export default darkTheme;
