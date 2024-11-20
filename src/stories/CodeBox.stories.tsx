import CodeBox, { CodeBoxProps } from "../components/CodeBox"
import { Container, Spacer } from "./storyhelper"

import { Meta } from "@storybook/react"
import React from "react"
import { StoryFn } from "@storybook/react/types-6-0"

const meta: Meta = {
  title: "CodeBox",
  component: CodeBox,
}

const Template: StoryFn<CodeBoxProps> = (args: CodeBoxProps) => (
  <Container>
    <CodeBox {...args} />
  </Container>
)

export const Playground = Template.bind({})
Playground.args = {
  code: `HTTP 1.0 /example
Authorization: foo-bar
Cookie: Yummy!`,
}

export const CheckboxWithTitleDescription = () => (
  <Container>
    <Spacer>
      <CodeBox
        code={`HTTP 1.0 /example
Authorization: foo-bar
Cookie: Yummy!`}
      />
    </Spacer>
  </Container>
)

export default meta
