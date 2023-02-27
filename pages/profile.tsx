import { PrismaClient } from '@prisma/client';
import MyProfile from '../components/profiles/MyProfile'
import {

  getSession

} from "next-auth/react";


const Profile = (params: { session: any; profile: any; profiles: any; }) => {

  const {session, profile} = params;
  

  //console.log(profile);
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
  const prisma = new PrismaClient();
  const session = await getSession(context);
  if (!session) {
    return {
      props: {
        session: null
      }, 
    }
  }

 
  const sessionUser = session?.user as User;
  const profile = await prisma.profile.findUnique({ where: { userId: sessionUser.id } });
  //const profiles = await prisma.profile.findMany({ take:-3 });
  console.log(sessionUser, profile);
  return {
    props: {
      session,
      profile,
      //profiles
    },
  }
}
export default Profile
