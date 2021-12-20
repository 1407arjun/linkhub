import User from '../components/login/user'
import { getSession } from 'next-auth/react'

const line1 = "Resources made open source"
const line2 = "Sign in to LinkHub."

export default function Login() {
    return (
        <User type="Sign in" line1={ line1 } line2={ line2 } rloc="/signup" rtype="Sign up" rdesc="Don't have an account? " loc="/login"/>
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