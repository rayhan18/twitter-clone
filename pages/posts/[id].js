import { collection, doc,docs, onSnapshot, orderBy, query } from 'firebase/firestore'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect,useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import GetComment from '../../components/Comment'
import CommandMudol from '../../components/CommandMudol'

import PostPage from '../../components/Post'
import Post from '../../components/Post'
import Sidebar from '../../components/Sidebar'
import Wedget from '../../components/Wedget'
import { db } from '../../firebase'
import { comment } from 'postcss'
import { AnimatePresence,motion } from 'framer-motion'



export default function Posts({newResult ,randomUsersResults}) {
    const router = useRouter()
    const {id} = router.query
    const [post ,setPost] = useState()
    const [comments ,setComments ] = useState([])
    
    //get posts
    useEffect(()=>{
        onSnapshot(doc(db, "posts" , id),(snapshot)=> setPost(snapshot))
    },[db ,id])

  //get commands
  // useEffect(()=>{
  //    onSnapshot(query(collection(db, "posts",id ,'comments'),
  //     orderBy("Timestamp",'disc')), (snapshot)=>setComments(snapshot.oldDocs))
  // },[db , id])
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);
 
   // console.log(comments ,'comments')
  return (
    <div className=''>
      <Head>
        <title className='hoverEffect'>Posts</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex min-h-screen px-8'>
          {/* sidebar */}
            
          <Sidebar/>

          {/* feede */}
            {/* <Feedes/> */}
            {/* <Post/> */}
            <div className='lg:ml-[230px] border-l border-r lg:min-w-[500px] sm:ml[70px] flex-grow max-w-lg'>
       
       <div className='flex items-center sticky px-2 py-2 top-0 z-50  bg-white border-b border-gray-200'>
           <div className='hoverEffect' onClick={()=> router.push('/')}>
             <BsArrowLeft className='mt-4 mx-5 '/>
           </div>
           <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Tweet</h2>
          
       </div>
      
       <PostPage id={id} allpostdata={post}/>
       {/* <p>{id}</p> */}
       {/* <h2> {}</h2> */}

       
        
       


         {comments.length > 0 &&(
            <div>
              <AnimatePresence>
                
              
             {comments.map((comment)=>(
                //console.log(comment.data() ,'hhh')
                <motion.div key={comment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                >
                  <GetComment key={comment.id} 
                commentId={comment.id} 
                originalPostId={id}
                comment={comment.data().comment}
                name={comment.data().name}
                uimg={comment.data().userImg}
                uname={comment.data().ussername}
                />
                </motion.div>
               
                
             ))}
             </AnimatePresence>
             </div>
         )}
    
    
   </div>
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