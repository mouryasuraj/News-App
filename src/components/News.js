import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
export class News extends Component {

  // Deafault Props
  static defaultProps={
    country:'in',
    category:'general',
    pagesize:9
  }

  // PropTypes
  static propTypes={
    country:PropTypes.string,
    category:PropTypes.string,
    pagesize:PropTypes.number
  }


  capitalize = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // Constructor

  constructor(props){
    super(props);
    this.state = {
      articles:[],
      loading:false,
      page:1,
      totalResults:0
    }
    console.log(this.state.articles.length)
    document.title = `${this.capitalize(this.props.category)} - NewsWave`
  }

  updateNews = async() =>{
    const sportUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2dac573a34394642a7927bef0d45bd54&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(sportUrl);
    let parsedData =await data.json();
    this.setState({
      articles : parsedData.articles,
      totalResults : parsedData.totalResults,
      loading:false
    })
  }

  // Fetch More Data
  fetchMoreData = async() => {
    this.setState({
      page:this.state.page + 1
    })
    const sportUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2dac573a34394642a7927bef0d45bd54&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(sportUrl);
    let parsedData =await data.json();
    this.setState({
      articles : this.state.articles.concat(parsedData.articles),
      totalResults : parsedData.totalResults
    })
  };



  // ComponenetDidMount function 
  async componentDidMount(){
    this.updateNews()
  }


 


  render() {
    
    return (
      <>
      <div className='w-full bg-slate-100 py-5 px-10'>
      {/* Heading */}
        <h2 className='md:text-3xl  sm:text-xl text-xl text-center font-bold text-slate-900 rounded-sm p-4 mb-5 '>NewsWave - Top {this.capitalize(this.props.category)} Headlines</h2>
        {/* News */}
      {/* {this.state.loading && <Loading />} */}
      <InfiniteScroll
          key={this.state.articles.url}
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading />}
        >
          <div className='flex flex-wrap gap-10 justify-center xl:px-44'>
              {this.state.articles.map((e)=>{
                return(
                    <NewsItem key={e.url} title={e.title} description={e.description ? e.description.slice(0,180):"Click read more for description"} imageUrl={e.urlToImage} newsUrl={e.url} source={e.source.name} publishedAt={e.publishedAt} author={e.author} />
                )
                
              })}
          </div>
        </InfiniteScroll>
        
        
      </div>
      </>
    )
  }
}

export default News
