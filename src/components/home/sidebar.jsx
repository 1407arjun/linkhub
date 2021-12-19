import ExploreMini from './explore-mini'
import SavedMini from './saved-mini'

export default function SideBar(props) {
    return (
        <div className="hidden lg:inline-block w-4/12 xl:w-2/6 p-1 border-l border-gray-300 dark:border-gray-600">
            <div className="flex flex-col place-content-start p-4 gap-4 rounded-3xl bg-white dark:bg-black">
                <h1 className="text-black dark:text-white text-2xl xl:text-3xl font-bold">Learn today</h1>
                <SavedMini saved={ props.saved }/>
                <ExploreMini/>
            </div>
        </div>    
    )
}