import PostMini from "../posts/post-mini"

export default function TabContent(props) {
    return (
        <div className="flex flex-col gap-4 justify-start items-center w-full">
            <div className="flex flex-col justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4">
                { props.yourPosts.map((data, index) => { return (
                    <PostMini key={ index } id={ data._id.toString() } name={ author.name }
                    username={ author.username }
                    email = { author.email }
                    title={ data.title }
                    body={ data.body }
                    tags={ data.tags }
                    date={ data.date }
                    upvotes={ data.upvotes }
                    downvotes={ data.downvotes }
                    flags={ data.flags }
                    saved ={ false }
                    delete ={ true }/>
                ) }) }
            </div>
            <p className="text-sm md:text-base italic dark:text-white">-- You have reached the end --</p>
        </div>
    )
}