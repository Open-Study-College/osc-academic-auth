import { extendTheme } from '@chakra-ui/react';

const colours = extendTheme({
    colors: {
        success: 'var(--colour-success)',
        notice: 'var(--colour-notice)'
    }
});

// as default export
export default colours;
