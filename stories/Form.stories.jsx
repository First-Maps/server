import React from 'react';

import { Form } from './Form';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example Form',
  component: Form,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Form {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Form',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Form',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Form',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Form',
};