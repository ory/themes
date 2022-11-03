// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

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
