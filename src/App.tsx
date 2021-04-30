import * as React from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from './store'
import { Home } from './pages'
import { ColorModeSwitcher } from './components'

export const App: React.FC<{}> = () => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher />
      <Home />
    </ChakraProvider>
  </Provider>
)

export default App
