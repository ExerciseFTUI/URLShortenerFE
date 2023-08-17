import React from 'react'
import HexaParticles from '../hexagonAnim/HexaParticles'

const NotFoundPage = () => {
  return (
    <div className='not-found w-container h-screen'>
        
        <HexaParticles
          background="#0D2734"
          color="#FAFAFA"
          angle="90"
          fullscreen={false}
          className="absolute top-0 left-0 z-[-1] w-full h-full"
        />

        <div className="bg-light text-dark-1 py-52 rounded-b-full flex flex-col items-center bg-opacity-80">
            <div className='text-dark-2'>
                <p className='text-9xl font-bold drop-shadow-lg'>404</p>
                <p className='font-bold text-xl'><i>Why you're here?</i></p>
            </div>
            <p className='mt-10 font-bold text-3xl w-3/4 text-center '>Make sure our domain name is written correctly! <br/> Come back later ;)</p>
        </div>

    </div>
  )
}

export default NotFoundPage