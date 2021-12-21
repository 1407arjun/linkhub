import PostMini from "../posts/post-mini"

export default function TabContent(props) {
    return (
        <div className="flex flex-col gap-4 justify-start items-center w-full">
            <div className="flex flex-col justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4">
                { props.posts.map((data, index) => { return (
                    <PostMini key={ index } id={ data._id.toString() } name={ data.author.name }
                        username={ data.author.username }
                        email={ data.author.email }
                        image={ data.author.image } 
                        title={ data.title }
                        body={ data.body }
                        tags={ data.tags }
                        date={ data.date }
                        upvotes={ data.upvotes }
                        downvotes={ data.downvotes }
                        flags={ data.flags }
                        option={ props.profile.upvoted.includes(data._id) ? "upvoted" : 
                            (props.profile.downvoted.includes(data._id) ? "downvoted" : 
                            (props.profile.flagged.includes(data._id) ? "flagged" : null)) }
                        saved ={ props.profile.saved.includes(data._id) }
                        delete ={ true }/>
                ) }) }
            </div>
            <p className="text-sm md:text-base italic dark:text-white">-- You have reached the end --</p>
        </div>
    )
}