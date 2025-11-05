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
      error: null
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - Media-Mingle`;
  }

  async updateNews() {
    try {
      this.props.setProgress(17);
      this.setState({ loading: true, error: null });

      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

      let data = await fetch(url);
      this.props.setProgress(48);

      if (!data.ok) {
        throw new Error(`Error fetching news: ${data.status} ${data.statusText}`);
      }

      let parsedData = await data.json();
      this.props.setProgress(84);

      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false,
      });

      this.props.setProgress(100);
    } catch (error) {
      this.setState({ loading: false, error: error.message });
      console.error("Error fetching news:", error);
    }
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${nextPage}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    if (!data.ok) return;

    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles || []),
      totalResults: parsedData.totalResults || 0,
      page: nextPage,
    });
  }

  render() {
    return (
      <div className="container my-4">
        <h1 className="text-center" style={{ margin: '38px' }}>
          Media Mingle - Top {this.capitalizeFirstLetter(this.props.category)} Headlines!
        </h1>

        {this.state.loading && <Spinner />}
        {this.state.error && <p className="text-danger text-center">{this.state.error}</p>}

        {!this.state.error && (
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
        )}
      </div>
    )
  }
}
