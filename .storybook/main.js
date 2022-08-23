module.exports = {
    features: {
        emotionAlias: false
    },
    stories: [
        '../app/components/**/*.stories.mdx',
        '../app/components/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        '@chakra-ui/storybook-addon',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-a11y'
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5'
    },
    webpackFinal: async (config, { configType }) => {
        config.resolve = {
            ...config.resolve,
            fallback: {
                ...(config.resolve || {}).fallback,
                fs: false,
                stream: false,
                os: false,
                emotionAlias: false
            }
        };

        // Return the altered config
        return config;
    }
};
