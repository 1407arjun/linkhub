import Link from 'next/link'
import SignBtn from "./signbtn"

export default function SignOpts(props) {
    return (
        <div className="flex flex-col gap-2 mb-6">
            <SignBtn name="Google" type={ props.type }/>
            <SignBtn name="GitHub" type={ props.type }/>
            <Link href={ "/auth" + props.href }><a className="hover:no-underline focus:no-underline"><SignBtn name="Email" type={ props.type }/></a></Link>
        </div>
    )
}