import type { Meta, Story } from '@storybook/react';
import FormToggle from './FormToggle';
import type { Props } from './FormToggle';

export default {
    title: 'FormToggle',
    component: FormToggle
} as Meta;

const Template: Story<Props> = (args) => {
    return <FormToggle {...args}></FormToggle>;
};

export const Primary = Template.bind({});

Primary.args = {
    id: 'storybook-form-toggle'
};
