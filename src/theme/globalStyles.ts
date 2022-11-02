// Copyright © 2022 Ory Corp

import { createGlobalStyle } from "styled-components"
import normalize from "./normalizeStyles"
import { ThemeProps } from "./helpers"

export const globalStyles = ({ theme }: ThemeProps) => `
${normalize}

html, body {
  background-color: ${theme.grey5};
}
`

export const GlobalStyle = createGlobalStyle(globalStyles)
