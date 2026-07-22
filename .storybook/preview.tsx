import type { Preview } from '@storybook/react';
import { ThemeProvider } from '../src/components/ThemeProvider';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        backgrounds: {
            disable: true,
        },
    },
    decorators: [
        (Story) => (
            <ThemeProvider showToggle={true} togglePosition="top-right">
                <Story />
            </ThemeProvider>
        ),
    ],
};

export default preview;