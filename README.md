# Ory Themes

This is a component library used across Ory frontend projects.

## Usage

`@ory/themes` bundles the components and theming variables for use in `React` and `ExpressJs handlebars`.

We can import a React component directly from the library:

```typescript tsx
import {Card} from '@ory/themes';

export const App = () => (
  <Card title={"A Card Title"}>
    <h1>Card Children</h1>
  </Card>
);
```

We can also use the component within `express-handlebars` by rendering the components to pure HTML:

```ts
// we can also use the global helper methods exposed by handlebars
app.set('view engine', 'hbs')

app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    layoutsDir: `${__dirname}/../views/layouts/`,
    partialsDir: `${__dirname}/../views/partials/`,
    defaultLayout: 'main',
    helpers: {
      ...require('handlebars-helpers')(),
      // this is a divider component with a class attached to it, we defined the class manually inside the public/main.css file
      divider: ComponentWrapper(
        Divider({ className: 'footer-divider', fullWidth: true })
      ),
      // this is a component for wrapping text
      typography: (text: string, size: any, color: any) =>
        ComponentWrapper(
          Typography({
            children: text,
            type: 'regular',
            size,
            color
          })
        )
    }
  })
)

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

<!-- Pass along parameters to the typography component from handlebars templates -->
{{{ typography 'Fork this on GitHub' 'small' 'foregroundMuted' }}}

{{{ divider }}}
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
    <link rel='stylesheet' href='normalize.css' />
    <!-- style.css is the theme with default values -->
    <link rel='stylesheet' href='style.css' />
    <!-- theme.css is the override of the theme variables generated on the fly -->
    <link rel='stylesheet' href='theme.css' />
    <!-- fontawesome icons are also included in the theme which we need to import to support icons -->
    <link rel='stylesheet' href='fontawesome.min.css' />
    <link rel='stylesheet' href='fa-solid.min.css' />
    <!-- the ory themes uses the Inter font by default and exposes the inter-font.css file -->
    <link rel='stylesheet' href='inter-font.css' />
    <!-- we can create our own css file in express for any custom styling we want to do - in this case we called it main.css -->
    <link rel='stylesheet' href='main.css' />
</head>
<body>
  {{{body}}}
</body>
</html>
```

All Ory theme variables are exposed as readable non-hashed values so that we can reuse it in our custom css statically

Here is an example of how that might look like. Please note some of these values are subject to change and this is just an example of what it includes.

```css
:root {
    --ory-theme-font-family: Inter;
    --ory-theme-font-style: normal;
    --ory-theme-accent-def: #3D53F5;
    --ory-theme-accent-muted: #6475F7;
    --ory-theme-accent-emphasis: #3142C4;
    --ory-theme-accent-disabled: #E0E0E0;
    --ory-theme-accent-subtle: #eceefe;
    --ory-theme-foreground-def: #171717;
    --ory-theme-foreground-muted: #616161;
    --ory-theme-foreground-subtle: #9E9E9E;
    --ory-theme-foreground-disabled: #BDBDBD;
    --ory-theme-foreground-on-dark: #FFFFFF;
    --ory-theme-foreground-on-accent: #FFFFFF;
    --ory-theme-foreground-on-disabled: #e0e0e0;
    --ory-theme-background-surface: #FFFFFF;
    --ory-theme-background-canvas: #FCFCFC;
    --ory-theme-error-def: #9c0f2e;
    --ory-theme-error-subtle: #fce8ec;
    --ory-theme-error-muted: #e95c7b;
    --ory-theme-error-emphasis: #DF1642;
    --ory-theme-success-emphasis: #18A957;
    --ory-theme-border-def: #E0E0E0;
    --ory-theme-text-def: #FFFFFF;
    --ory-theme-text-disabled: #757575;
    --ory-theme-input-background: #FFFFFF;
    --ory-theme-input-disabled: #E0E0E0;
    --ory-theme-input-placeholder: #9E9E9E;
    --ory-theme-input-text: #424242;
}
```

We can now use these variables inside our `main.css` file

```css
@import url('style.css');

body {
  margin: auto;
  min-height: 100vh;
  min-width: 100vw;
  background: var(--ory-theme-background-canvas);
  display: flex;
  flex-direction: column;
}
```

### Customizing the Ory theme

Thus far we have only used the default theme, however, we can change any variable exposed by the theme.

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

```typescript tsx
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

## Contributing to the library

Let's assume you would like to add a new Card component with custom styling.

We need to first create our vanilla-extract file `card.css.ts` inside the `theme` directory.

Here we will just use the `style` function from `'@vanilla-extract/css'`, however you can 
also use the `recipe` function from `'@vanilla-extract/recipes'` or even `createSprinkles` from `'@vanilla-extract/sprinkles'`.


```ts
import { pxToRem } from '../utils';
import { oryTheme } from './theme.css';
import { style } from '@vanilla-extract/css';

// the base card style with media queries
export const cardStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  border: `1px solid ${oryTheme.border.def}`,
  borderRadius: pxToRem(16),
  padding: pxToRem(48),
  background: oryTheme.background.surface,
  color: oryTheme.foreground.def,
  maxWidth: pxToRem(432),
  '@media': {
    'screen and (max-width: 768px)': {
      width: '100%',
      border: '0px',
      borderRadius: '0px',
      padding: `0px 0px ${pxToRem(32)}`
    }
  }
});
```

Now we can reference the styles directly in our `React` component.

Create a new file called `card.tsx` in the `react` directory.
We also add another `recipe` called `gridStyle` which helps us with the spacing.

```typescript tsx
import React from 'react';
import { cardStyle, gridStyle } from '../theme';
import cn from 'classnames';

export type CardProps = {
  title: string;
  className?: string;
  children?: React.ReactNode;
};

export const Card = ({ title, className, children }: CardProps) => (
  <div
    className={cn(
      cardStyle,
      className
    )}
  >
    <div className={gridStyle({ gap: 32 })}>
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  </div>
);
```

And now we need to create a storybook story for this component.

Create another file called `Card.stories.tsx` inside the `stories` directory.
We will wrap the theming component so we don't need to readd all the necessary imports
on every story. 

```typescript tsx
import React from 'react';
import { Story, ComponentMeta } from '@storybook/react';
import { Container } from './storyhelper';
import { Card, CardProps, Message } from '../react';

export default {
  title: 'Component/Card',
  component: Card,
  argTypes: {
    theme: {
      options: ['light', 'dark'],
      control: { type: 'radio' }
    }
  }
} as ComponentMeta<typeof Card>;

const Template: Story<CardProps> = (args: CardProps) => (
  <Container theme={'light'}>
    <Card {...args} />
  </Container>
);

// We are creating an example here which will automatically be injected into the `Template`
export const NormalCard = Template.bind({});

NormalCard.args = {
  title: 'Normal Title',
  children: <Message severity="error">This is an error message.</Message>
};
```


## Problems

**When testing in a dummy React / Preact app**

Please do not use `npm link` when debugging the library locally since node will bundle two react libraries and cause the app to crash.
This is due to the `@ory/themes` library using `useEffect()`. You will receive the following error https://reactjs.org/link/invalid-hook-call even though the implementation is correct.

To circumvent this use a `file:../themes` link instead.

e.g.

```json

"dependencies": {
  "@ory/themes": "file:../themes",
}
```