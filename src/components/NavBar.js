import React, { Component } from 'react'

export class NavBar extends Component {
  render() {
    return (
      <nav className='bg-slate-900 text-white p-4'>
        <div className="logo flex items-center justify-between ">
            <h1 className='text-2xl font-semibold mr-12 cursor-pointer'>NewsWale</h1>
            <ul className='flex items-center md:mr-10'>
                <li className='mr-6'><a className='hover:text-red-400 text-lg' href="/">Home</a></li>
                <li><a className='hover:text-red-400 text-lg' href="/">About</a></li>
            </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar
