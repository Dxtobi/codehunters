
import axios, {AxiosRequestConfig} from "axios";
import { useForm } from "react-hook-form";
import {useRouter} from "next/router"
import EditProfile from "../components/EditProfile";
import { PrismaClient } from '@prisma/client';



export default function Profile(params: { profile: object; idType: number; session:any}) {


  if (!params.session) {
    return <div>You not logged in</div>
  }
 

    return (
      <div className="flex min-h-[70vh] flex-col items-center  p-0  ">
       
              
      </div>
    )
}


export async function getServerSideProps(context: any) {


    const prisma = new PrismaClient();
    //console.log(context.query.id);
    const idType = context.query.type
    if (!context.query?.id) {
      return {
        props: {
          
        }
      }
    }
    const profile = await prisma.profile.findUnique({ where: { id: context.query?.id } });
    //console.log(profile);
    return {
      props: {
            profile,
            idType
      },
    }
  }