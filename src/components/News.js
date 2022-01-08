import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: "general"
    }

    static News = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }


    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        };
        document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4d43b777853b49fd91f3d4e24da04e5f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    async componentDidMount() {
        this.updateNews();
    }

    // Moving to previous page by clicking on Previous button
    // previousClick = async () => {
    //     this.setState({
    //         page: this.state.page - 1
    //     })
    //     this.updateNews();
    // }

    // Moving to next page by clicking on Next button
    // nextClick = async () => {
    //     this.setState({
    //         page: this.state.page + 1
    //     })
    //     this.updateNews();
    // }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4d43b777853b49fd91f3d4e24da04e5f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        });
    };

    render() {
        return (
            <>
                <h1 className="text-center">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className='container'>
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} author={element.author ? element.author : "Unknown"} lastUpdated={new Date(element.publishedAt).toGMTString()} newsUrl={element.url} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

                {/* Previous & Next button */}
                {/* <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.previousClick}>&laquo; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.nextClick}>Next &raquo;</button>
                </div> */}
            </>
        )
    }
}

export default News
