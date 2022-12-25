import React from 'react'

const NewsItem = (props) => {

    let {title, description, imageUrl, newsUrl, author} = props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{display:'flex', justifyConent:'flex-end', position:'absolute',right:'0'}}>
            <span className='badge rounded-pill bg-danger' style={{left: '90%', zIndex: '1'}}>
              {author}
            </span>
          </div>
            <img src={!imageUrl?"https://cdni0.trtworld.com/show_newsfeed.jpg":imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}...</p>
                <a rel ="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read in Detail</a>
            </div>
        </div>
      </div>
    )

}

export default NewsItem



// import React, { Component } from 'react'

// export class NewsItem extends Component {
//   render() {
//     let {title, description, imageUrl, newsUrl, author} = this.props;
//     return (
//       <div className='my-3'>
//         <div className="card">
//           <div style={{display:'flex', justifyConent:'flex-end', position:'absolute',right:'0'}}>
//             <span className='badge rounded-pill bg-danger' style={{left: '90%', zIndex: '1'}}>
//               {author}
//             </span>
//           </div>
//             <img src={!imageUrl?"https://cdni0.trtworld.com/show_newsfeed.jpg":imageUrl} className="card-img-top" alt="..." />
//             <div className="card-body">
//                 <h5 className="card-title">{title}</h5>
//                 <p className="card-text">{description}...</p>
//                 <a rel ="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read in Detail</a>
//             </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default NewsItem
