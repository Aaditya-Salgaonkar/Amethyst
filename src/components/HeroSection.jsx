import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';

const Herosection = () => {
  return (
    <div>

      <div className="flex flex-col items-center mt-6 lg:mt-20 border-b-2 border-gray-700 pb-40">
        
            <h1 className='text-4xl lg:text-7xl sm:text-6xl text-center tracking-wide'>WorkSphere Tools
                <span className='bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text'> for Freelancers</span> 
            
            </h1>
            <p className='mt-10 text-lg text-center text-neutral-500 max-w-4xl'>
            Supercharge your freelance workflow! Stay organized, track time, manage tasks, and boost productivity—all in one seamless platform. Work smarter, not harder. Take control of your freelance success today!

            </p>
            <div className="flex justify-center my-10">
                <a href="/signup" className="bg-gradient-to-r from-orange-500 to-orange-800 px-4 py-3 mx-3 rounded-md">Get Started</a>
            </div>
      </div>
    </div>
  )
}

export default Herosection
