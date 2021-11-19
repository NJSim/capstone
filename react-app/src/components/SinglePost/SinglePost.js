


function SinglePost({ post }) {

    return (
        <>
            <h2>{post.caption}</h2>

            <input></input>
            <button
                // onClick={(e) => {
                //     e.preventDefault();
                //     do dispatch editList with arguments needed (edited list etc)
                // }}
            >EDIT</button>
            <button>DELETE</button>
        </>
    )
}

export default SinglePost
