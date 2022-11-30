import React, { Component } from 'react'

export class Newsitem extends Component {
  
  render() {
    let {title, description, imageurl, newsUrl} = this.props;
    return (
      <div>
        <div className="card">
  <img src={!imageurl?"https://png.pngtree.com/png-clipart/20190114/ourlarge/pngtree-read-more-png-image_313345.jpg":imageurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem