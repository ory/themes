import CodeBox, { CodeBoxProps } from "../components/CodeBox"
import { Container, Spacer } from "./storyhelper"
import ForkMe, { ForkMeProps } from "../components/ForkMe"

import { Meta } from "@storybook/react"
import React from "react"
import { StoryFn } from "@storybook/react/types-6-0"

const meta: Meta = {
  title: "Fork Me",
  component: ForkMe,
}

const Template: StoryFn<ForkMeProps> = (args) => (
  <Container width={400}>
    <ForkMe {...args} />
  </Container>
)

export const Playground = Template.bind({})
Playground.args = {}

export default meta
