import { useState } from "react";


const Navbar = () => {
  const [Drawer, toggle] = useState(false);

  return (
    <div className="px-5 sm:px-10  md:px-16">
      <div className="py-2 flex justify-between items-center">
        <div style={{padding: '7px'}}>
          <img src="https://res.cloudinary.com/dkezdazmt/image/upload/v1735488122/Evernorth/evernorth.svg"/>
        </div>

        <div
            className={`w-full md:flex md:items-center md:w-auto 
            md:space-x-4 absolute md:relative top-16 left-0 md:top-0 
            md:left-0 p-4 md:p-0 bg-green-600 md:bg-transparent 
            transition-all duration-500 ease-in-out transform ${Drawer ? 
            'translate-x-0' : 'translate-x-full'
                } md:translate-x-0`}>

            <a  href="#home"
                className="block py-2 px-4 text-[#035c67] transition-transform transform hover:scale-110 
                            md:inline-block">Home
            </a>
            <a  href="#about"
                className="block py-2 px-4 text-[#035c67] transition-transform transform hover:scale-110 
                            md:inline-block">About
            </a>
            <a  href="#contact"
                className="block py-2 px-4 text-[#035c67] transition-transform transform hover:scale-110 
                            md:inline-block">Contact
            </a>

            
        </div>


        <div className="hidden md:flex">
              <div className="BtnClass">Login</div>
            </div>
        

        <div className="'font-bold text-3xl text-black md:hidden">
          <i onClick={() => toggle(!Drawer)} >
          {Drawer ? (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                        
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    )}
          </i>
        </div>
      </div>
    </div>
  )
}

export default Navbar;