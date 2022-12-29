import React from 'react'

const Newsitem =(props)=> {
  
    let {title, description, imageurl, newsUrl, date, author, source} = props;
    return (
      <div>
        <div className="card">
          <div style={{justifyCcontent: 'flex-end', position : 'absolute', display : 'flex', left : '0'}}>
        <span className="badge rounded-pill text-bg-danger">{source}</span>
        </div>
  <img src={!imageurl?"https://png.pngtree.com/png-clipart/20190114/ourlarge/pngtree-read-more-png-image_313345.jpg":imageurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By {!author?"Anonymous":author} on {new Date(date).toGMTString()} </small></p>
    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  
}

export default Newsitem