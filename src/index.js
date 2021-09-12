import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { RecoilRoot } from 'recoil'
import reportWebVitals from './reportWebVitals'
import { ThemeProvider } from 'styled-components'
import { LightTheme } from 'config/theme'
import AppProvider from 'stores/app_context'
import './i18n'

const AppWrapper = props => {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <AppProvider>
          <ThemeProvider theme={LightTheme}>
            <App {...props} />
          </ThemeProvider>
        </AppProvider>
      </RecoilRoot>
    </React.StrictMode>
  )
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'))

reportWebVitals(process.env.NODE_ENV === 'development' ? console.log : null)
