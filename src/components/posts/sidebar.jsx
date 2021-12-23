import RecentMini from "./recent-mini"

export default function SideBar(props) {
    return (
        <div className="hidden lg:inline-block w-4/12 xl:w-2/6 p-1 border-l border-gray-300 dark:border-gray-600">
            <div className="flex flex-col place-content-start p-4 gap-4 rounded-3xl bg-white dark:bg-black min-h-screen">
                <h1 className="text-black dark:text-white text-2xl xl:text-3xl font-bold">Quick add</h1>
                { props.upvoted.length > 0 && <RecentMini saved={ props.saved } upvoted={ props.upvoted }/> }
                { !props.upvoted.length > 0 && <h3 className="my-auto text-center text-base xl:text-lg font-semibold text-gray-400 dark:text-gray-300 px-2">It&apos;s lonely here. Upvote some posts and they will show up here</h3> }
            </div>
        </div>    
    )
}