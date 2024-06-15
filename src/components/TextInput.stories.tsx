import type { Meta, StoryObj } from '@storybook/react';
import TextInput from './TextInput';

const meta = {
  title: 'TextInput',
  component: TextInput,
  //   tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {};
