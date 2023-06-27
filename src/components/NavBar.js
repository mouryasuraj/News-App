import React, { Component } from 'react'
import MenuBar from './Icons/MenuBar'
import { Link } from 'react-router-dom'

export class NavBar extends Component {

  links = [
    {name:"Home", link:'/'},
    {name:"General", link:'/general'},
    {name:"Business", link:'/business'},
    {name:"Entertainment", link:'/entertainment'},
    {name:"Health", link:'/health'},
    {name:"Science", link:'/science'},
    {name:"Sports", link:'/sports'},
    {name:"Technology", link:'/technology'}
  ]


  render() {
    return (
      <nav className='bg-gray-700 text-white lg:p-2 p-4 sticky top-0'>
        <div className="logo lg:flex items-center justify-between ">
            <h1 className='text-2xl font-semibold mr-12 cursor-pointer'><Link to="/">NewsWave </Link></h1>
            {/* MenuBar */}
            <div className='lg:hidden absolute right-7 top-4 cursor-pointer'>
              <MenuBar />
            </div>
            <ul className='lg:flex hidden items-center md:mr-10'>
              {
                this.links.map((e, key)=>{
                  return <li key={key} className='lg:mr-6 my-3'><Link className='hover:text-red-400 lg:text-lg' to={e.link}>{e.name}</Link></li>
                })
              }
            </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar
