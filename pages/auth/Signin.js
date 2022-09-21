import {getProviders ,signIn} from 'next-auth/react'

export default function Signin({providers}) {
  return (
    <div className='flex justify-center mt-20 space-x-4'>
        <img src='https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch11signup.png.twimg.1920.png'
         alt="login img"
         className='hidden object-cover md:w-44 md:h-80 rotate-6  md:inline-flex'
         />
    
    <div  className="">
        {Object.values(providers).map((provider)=>(
            <div className="flex flex-col items-center" key={provider.id}>
                <img className="w-36 object-cover" src='https://help.twitter.com/content/dam/help-twitter/brand/logo.png' alt='twitter logo' />
                <p className="text-center text-sm italic my-3">This app is learning purpose</p>
                <button onClick={()=>signIn(provider.id, {callbackUrl: "/"})} className=" text-center bg-red-400 rounded-lg p-3 text-white hover:bg-red-500">Sign in {provider.name}</button>
            </div>
        ))}
    </div>
    </div>
  )
}

export async function getServerSideProps(){
    const providers = await getProviders()
    return{
         props:{
            providers,
        }
    }
}