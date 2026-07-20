import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: [
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/**/*.docs.mdx',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-docs',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
};

export default config;