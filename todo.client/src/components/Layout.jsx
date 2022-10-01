import {Outlet} from "react-router-dom"
import React from 'react'

const Layout = () => {
  return (
    <main className="App">
      {/* All the component will be rendered inside this layout thanks to Outlet */}
        <Outlet/>
    </main>
  )
}

export default Layout