import Head from 'next/head'
import CommandMudol from '../components/CommandMudol'
import Feedes from '../components/Feedes'
import Sidebar from '../components/Sidebar'
import Wedget from '../components/Wedget'



export default function Home({newResult ,randomUsersResults}) {
  return (
    <div className=''>
      <Head>
        <title className='hoverEffect'>Tweeter clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex min-h-screen px-8'>
          {/* sidebar */}
            
          <Sidebar/>

          {/* feede */}
            <Feedes/>
          
          {/* widget */}

            <Wedget newResult={newResult.articles} randomUsersResults={randomUsersResults.results}/>
          {/* modal */}
            <CommandMudol/>
      </main>
      

     
    </div>
  )
}


export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/business/us.json`)
  const newResult = await res.json()
  //who to flow me API
  let randomUsersResults = [];

  try {
    const res = await fetch(
      "https://randomuser.me/api/?results=30&inc=name,login,picture"
    );

    randomUsersResults = await res.json();
  } catch (e) {
    randomUsersResults = [];
  }

// const randomUsersResults = await fetch(
  //   "https://randomuser.me/api/?results=30&inc=name,login,picture"
  // ).then((res) => res.json());

  // Pass data to the page via props
  return { props: { newResult ,randomUsersResults } }
}