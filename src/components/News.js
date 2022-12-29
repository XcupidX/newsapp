import React, {useEffect, useState} from 'react'

import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async ()=> {
      props.setProgress(40);
          const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
          setLoading(true)
          let data = await fetch(url);
          let parsedData = await data.json()
          console.log(parsedData);
          setArticles(parsedData.articles)
          setTotalResults(parsedData.totalResults)
          setLoading(false)
          props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews(); 
        // eslint-disable-next-line
    }, [])


    const fetchMoreData = async () => {   
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1) 
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };
 
        return (
            <>
                <h1 className="text-center" style={{ margin: '30px 0px', marginTop: '35px' }}>Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
            </>
        )
    
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News


// import React, { useEffect, useState } from 'react'
// import Newsitem from './Newsitem'
// import Spinner from './Spinner';
// import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";


// const News = (props) => {

//   const [articles, setArticles] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [page, setPage] = useState(1)
//   const [totalResults, setTotalResults] = useState(0)

//   const capitlizeText = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);

//    }
    
  


//   const updateNews = async () => {
//     props.setProgress(40);
//     const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
//     setLoading(true)
//     let data = await fetch(url);
//     let parsedData = await data.json()
//     console.log(parsedData);
//     setArticles(parsedData.articles)
//     setTotalResults(parsedData.totalResults)
//     setLoading(false)
//     props.setProgress(100);
//   }

//   useEffect(() => {
//     document.title = `${ capitlizeText(props.category)} - NEWDS`;
//   updateNews();
// },[])




// // async componentDidMount() {
// //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fe43e5620336443894b8ea0704998064&page=1&pageSize=${props.pageSize}`;
// //   //  setState({ loading: true });
// //   // let data = await fetch(url);
// //   // let parsedData = await data.json()
// //   // console.log(parsedData);
// //   //  setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })

// //    updateNews();
// // }

// const fetchMoreData = async () => {
//   setPage(page + 1)
//   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
//   let data = await fetch(url);
//   let parsedData = await data.json()
//   console.log(parsedData);
//   setArticles(articles.concat(parsedData.articles))
//   setTotalResults(parsedData.totalResults)
// };

//   return (
//     <>
//       <strong><h2 className="text-center mb-4">TOP HEADLINES</h2></strong>
//       {loading && <Spinner />}

//       <InfiniteScroll
//         dataLength={articles.length}
//         next={fetchMoreData}
//         hasMore={articles.length !== totalResults}
//         loader={<Spinner />}
//       >
//         <div className='container'>
//           <div className="row">
//             {articles.map((element) => {
//               return <div className="col-md-4 mb-2" key={element.url}>
//                 <Newsitem title={element.title} description={element.description} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
//               </div>
//             }
//             )}
//           </div>

//         </div>
//       </InfiniteScroll>
//       {/* <div className="container d-flex justify-content-between">
//             <button disabled={ state.page <= 1} type="button" className="btn btn-dark" onClick={ handlePrevClick}>&larr; Previous</button>
//             <button disabled={ state.page + 1 > Math.ceil( state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={ handleNextClick}>Next &rarr;</button>
//           </div> */}
//     </>

//   )
// }



// News.defaultProps = {
//   country: "in",
//   pageSize: 9,
//   category: "general"
// }
// News.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string
// }
// export default News