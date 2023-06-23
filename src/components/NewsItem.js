import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let {title, description, imageUrl, newsUrl} = this.props;

    return (
      <>
      {/* card */}
        <div className="flex flex-col justify-between sm:w-[310px] w-full hover:bg-slate-200 p-3 cursor-pointer">
          <img className='sm:h-[200px] h-[250px] bg-contain' src={!imageUrl?"https://media.istockphoto.com/id/1141191007/vector/sports-set-of-athletes-of-various-sports-disciplines-isolated-vector-silhouettes-run-soccer.jpg?s=612x612&w=0&k=20&c=SEabW4SHZ7blMHJPxZNSTl_anOMHO3whQI7HIMxFpSg=" : imageUrl} alt="" />
            <h2 className='my-2 font-bold' >{title}</h2>
            <p>{description}...</p>
            <a target='blank' className='mt-3 w-fit hover:bg-red-700 border-slate-800 p-2 bg-slate-800 text-slate-100 rounded-sm' href={newsUrl}>Read More</a>
          </div>
      </>
    )
  }
}

export default NewsItem
