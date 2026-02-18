import React from 'react'
import { Link } from 'react-router'
import Logo from '../../src/assets/logo.png'

const LogoHome = () => {
    return (
        <Link to="/">
            <div className='flex items-center gap-2'>
                <img src={Logo} alt="FCI ICT Club Logo" className='w-12' />
                <h3 className='text-2xl font-bold'>FCI ICT CLUB</h3>
            </div>
        </Link>
    )
}

export default LogoHome
