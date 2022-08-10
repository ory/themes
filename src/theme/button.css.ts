import { oryTheme } from './theme.css';
import { pxToRem } from '../utils';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { defaultBreakpoints } from './consts';

export const buttonStyle = recipe({
  base: {
    // keep `all: unset` at the top since this removes the standard html styling from the button
    all: 'unset',
    boxSizing: 'border-box',
    fontFamily: 'Inter',
    textDecoration: 'none',
    color: oryTheme.text.def,
    background: oryTheme.accent.def,
    padding: pxToRem(10, 16),
    borderRadius: pxToRem(4),
    textAlign: 'center',
    cursor: 'pointer',
    ':disabled': {
      backgroundColor: oryTheme.text.disabled
    },
    ':hover': {
      backgroundColor: oryTheme.accent.muted
    },
    ':focus': {
      backgroundColor: oryTheme.accent.def,
      borderColor: oryTheme.accent.muted,
      outline: 'none'
    },
    ':active': {
      backgroundColor: oryTheme.accent.emphasis,
      outline: 'none'
    },
    '@media': {
      [`screen and (min-width: ${defaultBreakpoints.lg})`]: {
        fontSize: pxToRem(18),
        lineHeight: pxToRem(32),
        padding: pxToRem(16, 24)
      },
      [`screen and (min-width: ${defaultBreakpoints.md})`]: {
        fontSize: pxToRem(16),
        lineHeight: pxToRem(28)
      },
      [`screen and (max-width: ${defaultBreakpoints.sm})`]: {
        fontSize: pxToRem(14),
        lineHeight: pxToRem(20)
      }
    }
  },
  variants: {
    size: {
      medium: {
        fontSize: pxToRem(16),
        lineHeight: pxToRem(28)
      },
      small: {
        fontSize: pxToRem(14),
        lineHeight: pxToRem(20)
      },
      large: {
        fontSize: pxToRem(18),
        lineHeight: pxToRem(32),
        padding: pxToRem(16, 24)
      }
    },
    variant: {
      regular: {
        fontWeight: 400,
        fontStyle: 'normal'
      },
      semibold: {
        fontWeight: 600,
        fontStyle: 'normal'
      }
    }
  }
});

// Get the type
export type ButtonStyle = RecipeVariants<typeof buttonStyle>;
