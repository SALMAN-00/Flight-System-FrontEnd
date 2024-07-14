import React from 'react'
import { Link } from 'react-router-dom'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from './ui/navigation-menu'

export default function NavBar() {
  return (
    <>

<div className="bg-black text-white py-4 px-6 flex items-center justify-between mb-7">
        <Link to="/">
          <div className="ml-5">
            Flights
          </div>
        </Link>

        
    <NavigationMenu>
          <NavigationMenuList className=" gap-5 mr-5">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuItem>Home</NavigationMenuItem>
              </Link>
            </NavigationMenuItem>

            <Link to="/dashboard">
              <NavigationMenuItem>DashBoard </NavigationMenuItem>
            </Link>
           
              <Link to="/about">
                <NavigationMenuItem>About us</NavigationMenuItem>
              </Link>
            
           
              <Link to="/login">
                <NavigationMenuItem>Log in</NavigationMenuItem>
              </Link>
              <Link to="/signup">
                <NavigationMenuItem>Sign up</NavigationMenuItem>
              </Link>

            


          </NavigationMenuList>
        </NavigationMenu>
 
  
    </div>
    </>
  )
}
