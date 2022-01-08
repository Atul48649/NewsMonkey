import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, lastUpdated, author, source, newsUrl } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div className='d-flex justify-content-end position-absolute end-0' >
                        <span className="badge rounded-pill bg-danger">
                            {source}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    </div>
                    <img src={imageUrl ? imageUrl : "https://img.etimg.com/thumb/msid-88701304,width-1070,height-580,imgsize-655876,overlay-etmarkets/photo.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author} on {lastUpdated}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
