import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - Media Mingle`;
  }

  async updateNews() {
    this.props.setProgress(17);
    const url = `/api/news?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    this.setState({ loading: true });

    try {
      let data = await fetch(url);
      if (!data.ok) {
        throw new Error(`Error fetching news: ${data.status}`);
      }
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });
      this.props.setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
      this.props.setProgress(100);
    }
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 }, () => this.updateNews());
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 }, () => this.updateNews());
  }

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const url = `/api/news?country=${this.props.country}&category=${this.props.category}&page=${nextPage}&pageSize=${this.props.pageSize}`;

    try {
      let data = await fetch(url);
      if (!data.ok) {
        throw new Error(`Error fetching more news: ${data.status}`);
      }
      let parsedData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        page: nextPage,
      });
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  }

  render() {
    return (
      <div className="container my-4">
        <h1 className="text-center" style={{ margin: '38px' }}>
          Media Mingle - Top {this.capitalizeFirstLetter(this.props.category)} Headlines!
        </h1>

        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => (
                <div className="col-md-4 my-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 84) : ""}
                    imgUrl={element.urlToImage ? element.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhQI0RmQ9XflYum3wGbj6rNNuYQI--_5PlrA&s"}
                    newsUrl={element.url}
                    author={element.author ? element.author.slice(0, 10) : "Unknown"}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
