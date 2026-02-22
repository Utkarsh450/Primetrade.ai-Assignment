import Navbar from "./components/Navbar"
import MainRoutes from "./routes/MainRoutes"

const App = () => {
  return (
    <div className="w-screen h-screen">
      <Navbar/>


      <div className="h-full overflow-y-auto">
        <MainRoutes />
      </div>
    </div>
  )
}

export default App