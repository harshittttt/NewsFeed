import React, { useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState } from 'react';
import PropTypes from 'prop-types';


const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  
  const capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
 

    const updateNews = async()=>{
      props.setProgress(10);
      setPage(page + 1)
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

      setLoading(true);
      let data = await fetch(url);
      // props.setProgress(40);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
      
    }

    useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} - NewsFeed`
      updateNews()
      // eslint-disable-next-line
    }, [])
    

    // const handleprevChange = async() => {
    //   setPage(page - 1)
    //   updateNews()
    // }

    // const handlenextChange = async() => {
    //   setPage(page + 1)
    //   updateNews()

    //   // this.setState({ page: this.state.page + 1 }, () => 
    //   // updateNews());
    // }

    const fetchMoreData = async () =>{
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=099822dc092b4035862a2bd1df2f194e&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page + 1)
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      
    }


      return (
        <>
          <h1 className='text-center' style={{margin:'30px 0px', marginTop:'90px'}}>NewsFeed - Headlines - {capitalizeFirstLetter(props.category)}</h1>
          {loading && <Spinner/>}

          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
          >

          <div className="container">
          <div className="row">
          {articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author}/>
                     </div>
          })}
           </div>
           </div>

           </InfiniteScroll>
          
        </>
      )

}

News.defaultProps = {
    country : 'in',
    pageSize : 6,
    category : 'general'
  }

 News.propTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }


export default News




// import React, { Component } from 'react'
// import NewsItem from './NewsItem'
// import Spinner from './Spinner';
// // import PropTypes from 'prop-types'
// import InfiniteScroll from 'react-infinite-scroll-component'


// export class News extends Component {
  
//   // static defaultProps = {
//   //   country : 'in',
//   //   pageSize : 6,
//   //   category : 'general'
//   // }

//   // static PropTypes = {
//   //   country : PropTypes.string,
//   //   pageSize: PropTypes.number,
//   //   category: PropTypes.string,
//   // }

//   capitalizeFirstLetter = (string) =>{
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }
//     constructor(props){
//         super(props);
//         this.state = {
//           articles : [],
//           loading : false,
//           page: 1,
//           totalResults : 0
//         }
//         document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsFeed`
//     }

//     async updateNews(){
//       this.props.setProgress(10);
//       this.setState({page : this.state.page + 1})
//       const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//       this.setState({loading: true})
//       let data = await fetch(url);
//       // this.props.setProgress(40);
//       let parsedData = await data.json();
//       this.props.setProgress(70);
//       console.log(parsedData);
//       this.setState({articles: parsedData.articles,
//                     totalResults: parsedData.totalResults,
//                     loading: false
//         })
//         this.props.setProgress(100);
      
//     }
    
//     async componentDidMount(){
//       this.updateNews()
//     }

//     handleprevChange = async() => {
//       await this.setState({page: this.state.page - 1});
//       this.updateNews()
//     }

//     handlenextChange = async() => {
//       // await this.setState({page: this.state.page + 1})
//       // this.updateNews()

//       this.setState({ page: this.state.page + 1 }, () => 
//       this.updateNews());
//     }

    // fetchMoreData = async () =>{
    //   this.setState({page : this.state.page + 1})
    //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=099822dc092b4035862a2bd1df2f194e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
      
    //   this.setState({articles: this.state.articles.concat(parsedData.articles),
    //                 totalResults: parsedData.totalResults
                    
    //     })
    // }


    // render() {
    //   return (
    //     <>
    //       <h1 className='text-center' style={{margin:'30px 0px'}}>NewsFeed - Headlines - {this.capitalizeFirstLetter(this.props.category)}</h1>
    //       {this.state.loading && <Spinner/>}

    //       <InfiniteScroll
    //         dataLength={this.state.articles.length}
    //         next={this.fetchMoreData}
    //         hasMore={this.state.articles.length !== this.state.totalResults}
    //         loader={<Spinner/>}
    //       >

    //       <div className="container">
    //       <div className="row">
    //       {this.state.articles.map((element)=>{
    //           return <div className="col-md-4" key={element.url}>
    //                     <NewsItem title={element.title} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author}/>
    //                  </div>
    //       })}
    //        </div>
    //        </div>

    //        </InfiniteScroll>
          
    //     </>
    //   )
    // }

//   // render() {
//   //   return (
//   //     <div className='container my-3'>
//   //       <h1 className='text-center' style={{margin:'30px 0px'}}>NewsFeed - Headlines - {this.capitalizeFirstLetter(this.props.category)}</h1>
//   //       {this.state.loading && <Spinner/>}
//   //       <div className="row">
//   //       {!this.state.loading && this.state.articles.map((element)=>{
//   //           return <div className="col-md-4" key={element.url}>
//   //                     <NewsItem title={element.title} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
//   //                  </div>
//   //       })}
//   //        </div>
//   //       <div className="container d-flex justify-content-between">
//   //         <button disabled={this.state.page<=1} type='button' className='btn btn-dark'onClick={this.handleprevChange}>&larr; Previous</button>
//   //         <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' className='btn btn-dark'onClick={this.handlenextChange}>Next &rarr;</button>
//   //       </div>
//   //     </div>
//   //   )
//   // }
// }

// export default News
