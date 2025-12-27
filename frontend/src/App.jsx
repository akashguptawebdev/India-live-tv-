import './App.css'
import Layout from './component/Layout'
import PlayerScreen from './component/PlayerScreen'
import { AppProvider } from './context/AppContext'

function App() {

  return (
    <>
     <AppProvider>
    <Layout>
      <PlayerScreen />
    </Layout>
     </AppProvider>
    </>
  )
}

export default App
