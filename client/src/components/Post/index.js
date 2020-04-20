import React from "react";
import Card from "../Card";
import Button from "../Button"
import ViewPostModal from "../ViewPostModal";
import "./sass/style.scss";

// function Post(props) {
//     return (
//         <Card>
//             <div className="description-w-btn d-flex mb-3">
//                 <div className="titles">
//                     <h3 className="title text-left mb-3">{props.postTitle}</h3>
//                     <p className="description text-left">{props.postBody}</p>
//                 </div>
//                 <Button className="view-btn align-self-start ml-3"
//                     value="View"
//                 />
//             </div>
//             <div className="tags-w-num d-flex justify-content-between align-items-center">
//                 <div className="tags d-flex">
//                     <h6 className="tag">Food</h6>
//                     <h6 className="tag">Home</h6>
//                 </div>
//                 <p className="commentsNum font-weight-bold">{props.comments} Comments</p>
//             </div>
//         </Card>
//     );
// }


function Post({ post, posts }) {
    // useEffect(() => {
    // }, [])

    const handleBtnClick = event => {
        event.preventDefault();
        // console.log("Post id: " + event.target.id);
    };

    return (
        posts.map((post, i) => (
            <Card>
                <div className="description-w-btn d-flex mb-3">
                    <div className="titles">
                        <h3 className="title text-left mb-3">{post.postTitle}</h3>
                        <p className="description text-left">{post.postBody}</p>
                    </div>
                    <Button className="viewBtn align-self-start ml-auto"
                        id={post._id} value="view" data-toggle="modal"
                        data-target={`#viewPostModal${i}`}
                        onClick={handleBtnClick}
                    />
                    <ViewPostModal modalId={i} post={post} />
                </div>
                <div className="tags-w-num d-flex justify-content-between align-items-center">
                    <div className="tags d-flex">
                        {post.categories.map(category => (
                            <h6 className="tag">{category}</h6>
                        ))}
                    </div>
                    <p className="commentsNum font-weight-bold">{post.commentsArray.length} Comments</p>
                </div>
            </Card>
        ))
    );
}

export default Post;