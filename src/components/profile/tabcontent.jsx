import PostMini from "../posts/post-mini"

export default function TabContent() {
    return (
        <div className="flex flex-col gap-4 justify-start items-center w-full">
            <div className="flex flex-col justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4">
                <PostMini name="Arjun Sivaraman"
                    username="1407arjun"
                    title="Post Title"
                    body="Post Body"
                    upvotes="800"
                    downvotes="30"
                    flags="2"/>
                <PostMini name="Thor"
                    username="thor"
                    title="Post Title"
                    body="Post Body"
                    upvotes="1.2K"
                    downvotes="0"
                    flags="50"/>
            </div>
            <p className="text-sm md:text-base italic dark:text-white">-- You have reached the end --</p>
        </div>
    )
}