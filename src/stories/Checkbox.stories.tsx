import Checkbox, { CheckboxProps } from "../components/Checkbox"
import { Container, Spacer } from "./storyhelper"

import { Meta } from "@storybook/react"
import React from "react"
import { StoryFn } from "@storybook/react/types-6-0"

const meta: Meta = {
  title: "Checkbox",
  component: Checkbox,
}

const Template: StoryFn<CheckboxProps> = (args: CheckboxProps) => (
  <Container>
    <Checkbox {...args} />
  </Container>
)

export const Playground = Template.bind({})
Playground.args = {
  label: "Send me occasional updates and announcements with newsletters",
}

export const CheckboxWithTitleDescription = () => (
  <Container>
    <Spacer>
      <Checkbox
        title="Preferences"
        label="Send me occasional updates and announcements with newsletters"
        subtitle="Please select this option."
      />
      <Checkbox
        state="error"
        title="Preferences"
        label="Send me occasional updates and announcements with newsletters"
        subtitle="Please select this option."
      />
    </Spacer>
  </Container>
)

export default meta
