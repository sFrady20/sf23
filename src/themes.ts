import {
  experimental_extendTheme as extendTheme,
  CssVarsThemeOptions,
} from "@mui/material";
import Color from "color";
import { merge } from "lodash";

const base: CssVarsThemeOptions = {
  typography: {
    fontFamily: "Optician",
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: "inherit",
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.down("xl")]: {
            maxWidth: "90vw",
            padding: 0,
          },
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          minHeight: "calc(var(--1svh) * 100)",
          overflowX: "hidden",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,

          ["a, a:visited, a:hover, a:active"]: {
            color: "inherit",
            textDecoration: "none",
          },
          ["ul"]: {
            margin: 0,
            padding: 0,
          },

          ["& > #__next"]: {
            minHeight: "calc(var(--1svh) * 100)",
          },

          ["*::selection"]: {
            background: "#00000009",
          },
        },
      }),
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "h5" },
          style: {
            fontSize: 16,
            //fontFamily: "'Open Sans', sans-serif",
          },
        },
        {
          props: { variant: "subtitle2" },
          style: ({ theme }) => ({
            fontSize: 12,
            fontFamily: "'Open Sans', sans-serif",
            letterSpacing: 1.1,
          }),
        },
        {
          props: { variant: "caption" },
          style: ({ theme }) => ({
            color: theme.palette.text.secondary,
            fontFamily: "'Open Sans', sans-serif",
            letterSpacing: 1.1,
          }),
        },
      ],
    },
  },
};

const original = extendTheme(
  merge(base, {
    colorSchemes: {
      light: {
        palette: {
          background: { default: "#E2E2E2", paper: "#E9E9E9" },
          secondary: { main: "#CCCCCC" },
        },
      },
      dark: {
        palette: {
          background: { default: "#0F0F0F", paper: "#121212" },
          secondary: { main: "#333333" },
        },
      },
    },
  })
);

const shamrock = extendTheme(
  merge(base, {
    colorSchemes: {
      light: {
        palette: {
          mode: "light",
          background: {
            default: new Color("#CCCCCC").darken(0.03).hex(),
            paper: "#CCCCCC",
          },
          text: {
            primary: "#116611",
            secondary: new Color("#116611").lighten(1.5).desaturate(1).hex(),
          },
          secondary: {
            main: new Color("#116611").lighten(2).desaturate(0.8).hex(),
          },
        },
      },
      dark: {
        palette: {
          mode: "dark",
          background: {
            default: new Color("#122212").darken(0.1).hex(),
            paper: "#122212",
          },
          text: {
            primary: "#55AA55",
            secondary: new Color("#55AA55").darken(0.4).hex(),
          },
          secondary: { main: new Color("#122212").lighten(0.3).hex() },
        },
      },
    },
  })
);

export const themes = {
  original,
  shamrock,
};
