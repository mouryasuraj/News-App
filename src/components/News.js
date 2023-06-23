import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor(){
    super();
    this.state = {
      articles:[],
      loading:false,
      page:1,
      pageSize:21
    }
  }

  async componentDidMount(){
    let sportUrl = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=2dac573a34394642a7927bef0d45bd54&page=1&pageSize=${this.state.pageSize}`
    let data = await fetch(sportUrl);
    let parsedData =await data.json();
    this.setState({
      articles : parsedData.articles,
      totalResults : parsedData.totalResults
    })
    console.log(parsedData)
  }

  handleNxtClick = async() => {

      let sportUrl = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=2dac573a34394642a7927bef0d45bd54&page=${this.state.page+1}&pageSize=${this.state.pageSize}`
      let data = await fetch(sportUrl);
      let parsedData =await data.json();
      this.setState({
        articles : parsedData.articles,
        page : this.state.page + 1
      })
  }
  handlePrevClick = async() => {
    let sportUrl = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=2dac573a34394642a7927bef0d45bd54&page=${this.state.page-1}&pageSize=${this.state.pageSize}`
    let data = await fetch(sportUrl);
    let parsedData =await data.json();
    this.setState({
      articles : parsedData.articles,
      page : this.state.page - 1
    })
  }


  render() {
    
    return (
      <div className='w-full bg-slate-100 py-5 px-10'>
        <h2 className='md:text-2xl sm:text-xl text-lg text-center font-semibold text-slate-300 rounded-sm p-4 mb-5 bg-slate-600'>NewsWale - Top News</h2>
        <div className='flex flex-wrap gap-10 justify-center xl:px-44'>
        {this.state.articles.map((e)=>{
          return(
              <NewsItem key={e.url} title={e.title} description={e.description ? e.description.slice(0,180):"Click read more for description"} imageUrl={e.urlToImage} newsUrl={e.url} />
          )
        })}
        </div>
        <div className='mt-[50px] px-44 flex justify-between'>
            <button disabled={this.state.page <=1} className='bg-slate-700 text-lg border-[1px] p-2 text-white ' onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.state.pageSize)} className='bg-slate-700 text-lg border-[1px] p-2 text-white'  onClick={this.handleNxtClick}>Next &rarr;</button>
        </div>
        
      </div>
    )
  }
}

export default News
