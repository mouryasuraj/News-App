import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'
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
    }
    document.title = `${this.capitalize(this.props.category)} - NewsWave`
  }



  // ComponenetDidMount function 
  async componentDidMount(){
    let sportUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2dac573a34394642a7927bef0d45bd54&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(sportUrl);
    let parsedData =await data.json();
    this.setState({
      articles : parsedData.articles,
      totalResults : parsedData.totalResults,
      loading:false
    })
    console.log(parsedData)
  }

  // Next Button function
  handleNxtClick = async() => {
    
      let sportUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2dac573a34394642a7927bef0d45bd54&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data = await fetch(sportUrl);
      let parsedData =await data.json();
      this.setState({
        articles : parsedData.articles,
        page : this.state.page + 1,
        loading:false
      })
      
  }

  // Previous Button function
  handlePrevClick = async() => {
    let sportUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2dac573a34394642a7927bef0d45bd54&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(sportUrl);
    let parsedData =await data.json();
    this.setState({
      articles : parsedData.articles,
      page : this.state.page - 1,
      loading:false
    })
  }


  render() {
    
    return (
      <>
      <div className='w-full bg-slate-100 py-5 px-10'>
      {/* Heading */}
        <h2 className='md:text-3xl  sm:text-xl text-xl text-center font-bold text-slate-900 rounded-sm p-4 mb-5 '>NewsWave - Top {this.capitalize(this.props.category)} Headlines</h2>
        {/* News */}
      {this.state.loading && <Loading />}
        <div className='flex flex-wrap gap-10 justify-center xl:px-44'>
        {!(this.state.loading) && this.state.articles.map((e)=>{
          return(

              <NewsItem key={e.url} title={e.title} description={e.description ? e.description.slice(0,180):"Click read more for description"} imageUrl={e.urlToImage} newsUrl={e.url} source={e.source.name} publishedAt={e.publishedAt} author={e.author} />
          )
          
        })}
        </div>
        {/* Next and Previous Button */}
        <div className='mt-[50px] md:px-44 flex justify-between'>
            <button disabled={this.state.page <=1} className='bg-slate-700 text-lg border-[1px] p-2 text-white ' onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className='bg-slate-700 text-lg border-[1px] p-2 text-white'  onClick={this.handleNxtClick}>Next &rarr;</button>
        </div>
        
      </div>
      </>
    )
  }
}

export default News
