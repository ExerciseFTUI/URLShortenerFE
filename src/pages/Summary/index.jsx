import React from 'react'
import qr from "../../assets/qr-codes.png"
import pointer from '../../assets/summary/pointer.png'
import { useState } from 'react'

const SummaryPage = () => {

    const [open, setOpen] = useState(true);

    const menu = [
        "Nama User",
        "History Links",
        "QR Codes",
        "Custom Links"
    ]

    return (
    <div>
        <div 
            className={`${open ? "w-48 md:w-60 lg:w-80" : "w-0"} fixed duration-300 h-screen bg-grey z-10 mt-24  pt-16  flex flex-col`}
        >
            <div className={`${!open && "-translate-x-32 ease-out"} duration-300 grid grid-rows-2 pt-10 md:pt-6 lg:pt-0 px-3 md:px-5`}>
                <button className='bg-dark-2 h-9 rounded-md font-semibold text-sm'>Create New</button>
                <div className='h-0.5 bg-grey-1 opacity-30 mt-5 mb-6'></div>
                {
                    menu.map((menu, i) => {
                        return(
                            <button className='bg-grey-2 bg-opacity-0 hover:bg-opacity-10 border-2 border-opacity-30 border-grey-1 hover:border-0 text-dark h-9 rounded-md font-semibold text-sm mb-6'>{menu}</button>
                        )
                    }) 
                }
                
            </div>
            <div className={`${!open && "-translate-x-32 ease-out"} duration-300 px-3 md:px-5 mt-auto`}>
                <button className={`bg-light w-full h-9  mb-14 rounded-md font-semibold text-sm text-dark`}>Log Out</button>
            </div>
           
        </div>
        
        <img 
            src={pointer}  
            className={`${open ? "left-48 md:left-60 lg:left-80" : 'left-0'} fixed duration-300 cursor-pointer top-24 z-10 w-7 md:w-10`}
            onClick={() => setOpen(!open)}
        />
        
            
        <div 
        className='section-1 bg-light py-5 mt-0 pt-20 px-3 md:px-8 space-y-6'>
            <div className='max-md:hidden bg-neutral-200 h-1'></div>
            <div className='drop-link pt-8 md:pt-14 rounded-sm shadow-md h-96 bg-grey'
            style={{
                // backgroundImage: `url(${bg})`
            }}
            >
                <p className='text-3xl md:text-3xl lg:text-4xl font-semibold w-3/4 mx-7 md:mx-16 drop-shadow-lg md:drop-shadow-md'>Since the very beginning...</p>
                
                <div className='mx-5 mt-10 flex md:justify-center'>
                    <label className='w-full md:w-3/5'>
                        <input className='w-full h-9 rounded-sm placeholder:text-grey-1 placeholder:tracking-widest placeholder:text-xs md:placeholder:text-sm' placeholder='   Drop your link here!'/>
                    </label>
                    <button className='bg-dark-2 w-24 text-xs md:text-sm rounded-sm tracking-widest'><small>Get URL</small></button>
                </div>
                <div className='flex md:justify-center'>
                    <p className='w-2/3 mx-5 pt-7 md:pt-3 text-dark-1 text-xs md:text-sm tracking-wider'>Create new custom shorten link</p> 
                </div>             
            </div>
            <div className='try-qr bg-light rounded-sm shadow-md pt-8 px-5 h-72 md:flex md:px-10'>
                <div className='w-full'>
                    <p className='text-dark-2 text-2xl font-semibold md:text-3xl lg:text-4xl'>Try Our QR Code</p>
                    <div className='flex pt-5'>
                        <div className='space-y-12 w-full'>
                            <p className='text-dark-1 text-xs tracking-wider w-11/12 md:w-full md:text-base'>Create new custom shorten link</p>
                            <button className='w-28 h-8 bg-dark-2 text-xs font-semibold rounded-md tracking-widest'><small>Get Here</small></button>
                        </div>
                        <img src={qr} className='h-28 md:h-36 md:hidden'/>
                    </div>
                </div>
                
                <img src={qr} className='max-md:hidden h-40 mr-5'/>
            </div>

            <div className='section-2 max-md:h-screen bg-dark-2 px-6 lg:px-10 py-10 lg:py-16 shadow-md rounded-sm flex flex-col'>
                <p className='text-2xl md:text-3xl lg:text-4xl lg:tracking-wider xl:tracking-widest font-semibold mb-5'>Manage Links</p>
                <p className='text-sm mb-5 tracking-wider lg:hidden'>Create new custom shorten link</p>
                <div className='bg-light text-dark flex flex-col justify-center py-12 lg:py-24 space-y-4 lg:w-3/5 lg:ml-auto'>
                    <p className='mx-auto font-semibold tracking-wider lg:font-light lg:italic md:text-lg lg:text-2xl'>Shorten your links today!</p>
                    <button className='bg-dark-1 text-light text-sm lg:text-base w-40 h-9 mx-auto rounded-sm tracking-wider lg:w-44 lg:h-8 '><small>Create your first link</small></button>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default SummaryPage