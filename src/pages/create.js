import Link from 'next/link'
import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import Markdown from '../components/editor/markdown'
import Preview from '../components/editor/preview'
import EditorContext from '../components/editor/context'
import SearchBar from '../components/uni/searchbar'
import TagBar from '../components/editor/tagbar'
import client from '../server/loaders/database'
import axios from 'axios'

export default function Create(props) {
    const [titleText, setTitleText] = useState("")
    const [tags, setTags] = useState([])
    const [markdownText, setMarkdownText] = useState("")
    const contextValue = { markdownText, setMarkdownText }
    const router = useRouter()

    function handleTitleChange(ev) {
        if (ev.target.value.length > 32)
            setTitleText(ev.target.value.slice(0, 32))
        else
            setTitleText(ev.target.value)    
    }

    function handleTagsChange(tagsArray) {
        setTags(tagsArray)
    }

    async function newPost(ev) {
        ev.preventDefault()
        const res = await axios.post("/api/new-post", {
            title: ev.target[0].value,
            body: ev.target[1].value,
            tags: tags,
            date: (new Date()).toLocaleString()
        })

        if (res.status === 200)
            router.push("/post/" + res.data.id)
        else
            router.push("/home")
    } 

    return (
        <div className="dark:bg-black">
            <Head title="New post &middot; LinkHub"/>
            <div className="flex flex-col justify-start items-start py-4 px-4 md:px-8 gap-6 min-h-screen">
                <div className="flex flex-row justify-start items-center gap-2 w-full">
                    <Link href="/home"><a className="p-2 md:p-4 rounded-full hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-800 hover:no-underline focus:no-underline"><img src="/assets/editor/arrow-left.svg" className="w-8 sm:w-10 md:w-12 mx-auto dark:filter dark:invert" alt="Back"/></a></Link>
                    <h2 className="w-full font-bold text-2xl md:text-3xl text-left dark:text-white">New post</h2>
                    <div className="justify-self-end self-center w-2/3">
                        <SearchBar placeholder="Search LinkHub" smhidesearch={ true } />
                    </div>
                </div>
                <form onSubmit={ newPost } className="flex flex-col gap-3 justify-center items-start w-full px-0 md:px-2 h-full">
                    <div className="w-full md:w-4/5 lg:w-2/3 xl:w-1/2">
                        <input onChange={ handleTitleChange } name="title" type="text" placeholder="Title (will be displayed on the browser tab)" className="w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:bg-black dark:text-white dark:focus:ring-gray-100 text-lg md:text-xl font-semibold" value={ titleText } autoComplete="off" required/>
                        <p className="px-1 py-0.5 text-right text-gray-500 dark:text-gray-300 text-sm md:text-base">{ titleText.length + " of 32 characters" }</p>
                    </div>
                    <div className="w-full h-full">
                        <EditorContext.Provider value={ contextValue }>
                            <div className="grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 justify-center items-start gap-4 rounded-md border border-gray-300 p-3 lg:p-4">
                                <Markdown/>
                                <Preview/>
                            </div>
                        </EditorContext.Provider>
                        <div className="flex flex-row justify-start items-center gap-2 px-1 py-0.5 text-left">
                            <img src="/assets/editor/markdown.svg" className="dark:filter dark:invert" alt="md"/>
                            <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-300 hover:underline focus:underline"><p className="text-sm md:text-base">Markdown supported</p></a>
                        </div>
                    </div>
                    <TagBar update={ handleTagsChange }/>
                    <button className="w-full md:w-auto flex flex-row justify-center items-center gap-3 px-6 py-3 rounded-md bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-60">
                        <img src="/assets/editor/send.svg" className="w-5 md:w-6" alt="Post"/>
                        <span className="text-lg md:text-xl font-semibold text-white">Post</span>
                    </button>
                </form>
            </div>
            <Footer username={ props.user.username } signedin={ true }/>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (session) {
        const mClient = await client
        const profile = JSON.parse(JSON.stringify(await mClient.db("Client").collection("profiles").findOne({"user.email": session.user.email})))
        //await mClient.close()
        if (!profile)
            return {
                redirect: {
                destination: "/complete/username"
                },
                props: {}
            }
        else
            return {
                props: { user: profile }
            }
    } else {
        return {
            redirect: {
            destination: "/login"
            },
            props: {}
        }
    }
}