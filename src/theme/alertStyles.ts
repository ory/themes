// Copyright © 2023 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { ThemeProps } from "./helpers"

export interface AlertStyles extends ThemeProps {
  severity?: "error" | "info"
}

export const alertStyles = ({ theme, severity = "info" }: AlertStyles) => `
border: 1px solid ${severity === "info" ? theme.green30 : theme.red30};
color: ${severity === "info" ? theme.grey100 : theme.red60};
border-radius: 5px;
padding: 5px;
margin: 10px auto;
`

export const alertContentStyles = () => `
margin: 0;
`
