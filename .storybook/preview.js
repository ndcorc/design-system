import { useState } from 'react';

import { mantineTheme } from 'storybook-addon-mantine';
import { useDarkMode } from 'storybook-dark-mode';
import rtlPlugin from 'stylis-plugin-rtl';

import {
  ActionIcon,
  Affix,
  ColorSchemeProvider,
  createEmotionCache,
  MantineProvider,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';

import { lightTheme } from '../themes';

const rtlCache = createEmotionCache({
  key: "mantine-rtl",
  stylisPlugins: [rtlPlugin],
});
// These props are passed to the MantineProvider used by all stories.
const mantineProviderProps = {
  withCSSVariables: false,
  withGlobalStyles: true,
  withNormalizeCSS: false,
};

function ThemeWrapper(props) {
  const [rtl, setRtl] = useState(false);
  const toggleRtl = () => setRtl((r) => !r);
  useHotkeys([["mod + L", toggleRtl]]);

  return (
    <ColorSchemeProvider colorScheme="light" toggleColorScheme={() => {}}>
      <MantineProvider
        theme={{
          dir: rtl ? "rtl" : "ltr",
          colorScheme: useDarkMode() ? "dark" : "light",
          headings: { fontFamily: "Greycliff CF, sans-serif" },
        }}
        emotionCache={rtl ? rtlCache : undefined}
        withGlobalStyles
        withNormalizeCSS>
        <Affix
          position={{
            right: rtl ? "unset" : 0,
            left: rtl ? 0 : "unset",
            bottom: 0,
          }}>
          <ActionIcon
            onClick={toggleRtl}
            variant="default"
            style={{
              borderBottom: 0,
              borderRight: 0,
              borderTopLeftRadius: 4,
              width: 60,
              fontWeight: 700,
            }}
            radius={0}
            size={30}>
            {rtl ? "RTL" : "LTR"}
          </ActionIcon>
        </Affix>
        <div dir={rtl ? "rtl" : "ltr"}>{props.children}</div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

/*
 * Global decorator to apply the styles to all stories
 * Read more about them at:
 * https://storybook.js.org/docs/react/writing-stories/decorators#global-decorators
 */
export const decorators = [
  (renderStory) => (
    <>
      <ThemeWrapper>{renderStory()}</ThemeWrapper>
    </>
  ),
  mantineTheme(
    [
      { ...lightTheme, themeName: "Light Mode" },
      {
        themeName: "Dark Mode - Green",
        primaryColor: "green",
        colorScheme: "dark",
        radius: 0,
      },
    ],
    mantineProviderProps,
  ),
];

/*
 * Read more about global parameters at:
 * https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
 */
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
