import React, { Component } from 'react'
import {Link} from "react-router-dom";

export default class NewsItem extends Component {
  render() {
    
    let {title, description, imgUrl, newsUrl, author, date, source}=this.props;
    return (
      <div>

        <div className="card">

          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}>{source}..</span>
              <img src={imgUrl} style={{height: '197px'}} className="card-img-top" alt="..."/>
                <div className="card-body" style={{height: '222px'}}>
                  <h5 className="card-title"> {title}.....</h5>
                  <p className="card-text">{description}.....</p>
                  <p className="card-text"><small className="text-body-secondary">By <strong>{author}</strong> on {new Date(date).toGMTString()}</small></p>
                  <Link rel="noreferrer" to={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</Link>
                </div>
        </div>
      </div>
    )
  }
}