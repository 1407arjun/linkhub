import RecentMini from "./recent-mini"

export default function SideBar() {
    return (
        <div className="hidden lg:inline-block w-4/12 xl:w-2/6 p-1 border-l border-gray-300">
            <div className="flex flex-col place-content-start p-4 gap-4 rounded-3xl bg-white">
                <h1 className="text-black text-2xl xl:text-3xl font-bold">Quick add</h1>
                <RecentMini/>
            </div>
        </div>    
    )
}