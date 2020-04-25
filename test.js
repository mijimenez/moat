return (
    <div>
        <div className="modal fade" id="viewModal" tabindex="-1" role="dialog" aria-labelledby="viewPostModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title" id="viewPostModalLabel">{postId} Posted by {post.username}</p>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <p className="description text-left">{post.postBody}</p>
                        </div>
                        <div className="tags-w-num d-flex justify-content-between align-items-center">
                            <div className="tags d-flex">
                                {post.categories.map(category => (
                                    <h6 className="tag">{category}</h6>
                                ))}
                            </div>
                        </div>
                        <p className="commentsNum font-weight-bold description text-left">
                            {post.commentsArray.length} Comments
                        </p>
                        <TextArea
                            onChange={handleInputChange}
                            name="commentBody"
                            placeholder=""
                        />
                    </div>
                    <div className="modal-footer">
                        <Button
                            disabled={!formObject.commentBody}
                            onClick={handleBtnClick}
                            value="comment"
                        />
                    </div>
                </div>{test}
            </div>
        </div>
    </div>
);