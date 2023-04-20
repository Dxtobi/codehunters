
import MyProfile from '../components/profiles/MyProfile'
import {

  getSession

} from "next-auth/react";
import { allUserFunc } from '../lib/helpers';


const Profile = (params: { session: any; profile: any; profiles: any; }) => {

  const {session, profile} = params;
  

  console.log(profile);
 // const [auth, setAuth] = useState(false);

  if (!session) {
    return <div>You not logged in</div>
  }
 
  return (
    <>
      <div className=" ">    
        <MyProfile session={session} profile={profile}/>
      </div>
    </>
  )
}



export async function getServerSideProps(context: any) {
  
  const session = await getSession(context);
  if (!session) {
    return {
      props: {
        session: null
      }, 
    }
  }

 
  const sessionUser = session?.user as User;
  const profile = await allUserFunc.GET_ME(sessionUser.id)
  return {
    props: {
      session,
      profile,
      //profiles
    },
  }
}
export default Profile
