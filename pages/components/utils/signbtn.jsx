import Google from '../../../public/assets/login/google.svg'
import GitHub from '../../../public/assets/login/github.svg'
import Email from '../../../public/assets/login/email.svg'
import Image from 'next/image'

export default function SignBtn(props) {
    const bgColor = props.name === 'Email' ? "bg-blue-500 hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:ring-opacity-60" : (props.name === 'Google' ? "bg-red-500 hover:bg-red-700 focus:ring focus:ring-red-300 focus:ring-opacity-60" : ( props.name === 'GitHub' ? "bg-gray-900 hover:bg-black focus:ring focus:ring-gray-500 focus:ring-opacity-60" : "bg-blue-500 hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:ring-opacity-60"))
    return (
        <button className={"flex flex-row justify-center items-center rounded-full  p-2 w-1/2 gap-2 " + bgColor}>
            {props.name === 'Email' ? <Image src={ Email } alt=""/> : (props.name === 'Google' ? <Image src={ Google } alt=""/> : ( props.name === 'GitHub' ? <Image src={ GitHub } alt=""/>  : null))}
            <span className="text-white font-semibold">{ props.type + " with " + props.name }</span>
        </button>
    )
}