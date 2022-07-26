# Ory Themes

This is a component library used across Ory frontend projects.

## Usage

`@ory/themes` bundles the components and themes it using standard CSS.

This library tries to support as many frameworks as possible in the Web ecosystem.

We can import a React component directly from the library:

```typescript jsx
import {Card} from '@ory/themes';

export const App = () => (
  <Card title={"A Card Title"}>
    <h1>Card Children</h1>
  </Card>
);
```

We can also use the component within `express-handlebars` by rendering the components to HTML:

```ts
 // Render the data using a view (e.g. Jade Template):
res.render('login', {
  ...flow,
  isAuthenticated: flow.refresh || flow.requested_aal === 'aal2',
  signUpUrl: initRegistrationUrl,
  logoutUrl: logoutUrl,
  card: ComponentWrapper(Card({
    title: "Login With Ory",
    children: Message({message: "Woah there", severity: "info"})
  }))
});
```

Inject the card as raw HTML into handlebars

```handlebars
{{{ card }}}
```

## Theming

All components are styled using pure CSS classes that are generated
by [Vanilla-extract css](https://vanilla-extract.style/) on build time of the library.

Since we are styling everything as pure CSS, we can override the variables in the theme with our own custom styles.
Depending on the technology we use to render the component, we need to use a different method to override the theme.

In `express` we can use the helper function `registerOryThemesStatic` to inject theme variables into the page.

First we need to include our styles exposed by the `registerOryThemesStatic` helper by including standard css in the `head` of the page:

```handlebars
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="theme.css">
    <link rel="stylesheet" href="inter-font.css">
    <link rel="stylesheet" href="brands-icons.min.css">
</head>
<body>
  {{{body}}}
</body>
</html>
```

In this example we are just passing back the default light theme, however, we can change any variable exposed by the
theme.

```ts
import {registerOryThemesStatic} from '@ory/themes/helpers/express'
import {defaultLightTheme} from '@ory/themes'

export const registerStaticRoutes: RouteRegistrator = (app) => {
  registerOryThemesStatic(app, {
    ...defaultLightTheme
  })
}
```

In `React` we can use it directly inside a container component:

```jsx
import React, {ReactNode} from 'react';
import {assignInlineVars} from "@vanilla-extract/dynamic";
import '@ory/theme/style.css';
import {
  defaultDarkTheme, 
  defaultLightTheme,
  oryTheme,
} from "@ory/theme";

export const Container = ({children, theme = 'light'}: {
  children: ReactNode;
  theme: 'light' | 'dark';
}) => (
  <div style={assignInlineVars(oryTheme, {
    ...(theme === 'dark' ? defaultDarkTheme : defaultLightTheme),
  })}>
    {children}
  </div>
);
```
