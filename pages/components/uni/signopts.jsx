import SignBtn from "../utils/signbtn"

export default function SignOpts(props) {
    return (
        <div className="flex flex-col gap-2 mb-6">
            <SignBtn name="Google" type={ props.type }/>
            <SignBtn name="GitHub" type={ props.type }/>
            <SignBtn name="Email" type={ props.type }/>
        </div>
    )
}