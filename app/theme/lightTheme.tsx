import { extendTheme } from '@chakra-ui/react';
import colours from './global/colours';

const lightTheme = extendTheme(colours, {
    shadows: {
        outline:
            '0 2.8px 2.2px rgb(0 0 0 / 3.4%), 0 6.7px 5.3px rgb(0 0 0 / 4.8%), 0 12.5px 10px rgb(0 0 0 / 6%), 0 22.3px 17.9px rgb(0 0 0 / 7.2%), 0 41.8px 33.4px rgb(0 0 0 / 8.6%), 0 100px 80px rgb(0 0 0 / 12%)'
    },
    colors: {
        primary: 'var(--colour-white)',
        secondary: 'black',
        tertiary: 'var(--colour-grey)',
        quaternary: 'var(--colour-black)'
    },
    components: {
        Button: {
            variants: {
                primary: {
                    _hover: {
                        bg: 'quaternary',
                        color: 'primary'
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
    },
    styles: {
        global: {
            'html, body': {
                bg: 'tertiary',
                color: 'secondary'
            }
        }
    }
});

// as default export
export default lightTheme;
