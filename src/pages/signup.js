import User from '../components/login/user'
import { getSession } from 'next-auth/react'

const line1 = "Resources made open source"
const line2 = "Join LinkHub today."

export default function SignUp() {
    return (
        <User type="Sign up" line1={ line1 } line2={ line2 } rloc="/login" rtype="Sign in" rdesc="Already have an account? " loc="/signup"/>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (session) {
        return {
          redirect: {
            destination: "/home"
          },
          props: {}
        }
    }
    return {props: {}}
  }