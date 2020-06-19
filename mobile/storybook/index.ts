/* eslint-disable global-require */
import { AppRegistry } from 'react-native';

import { getStorybookUI, configure } from '@storybook/react-native';

import './decorators';

// import stories
configure(() => {
  require('./stories');
}, module);

const StorybookUIRoot = getStorybookUI({
  port: 7007,
  host: 'localhost',
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  asyncStorage: require('@react-native-community/async-storage').default,
});

AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;
