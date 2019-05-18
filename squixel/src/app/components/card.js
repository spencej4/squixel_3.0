import React, {Component} from 'react';

class Card extends Component   {

  render () {
    if (this.props.loading === false) {
      return (
        this.props.data.map((item, id) => {
          // log all the data
          // console.log(this.props.data[id]);
          //For landscape photos
          if (this.props.data[id].width > this.props.data[id].height){
            return (
              <div className='imgSmall' 
                    key={id}
                    onClick={() => {
                      let image = this.props.data[id].urls.full;
                      let smallImage = this.props.data[id].urls.small;
                      let width = this.props.data[id].width;
                      let height = this.props.data[id].height;
                      let fullscreenData = this.props.data[id];
                      this.props.showFullScreenImage(image, smallImage, width, height, fullscreenData)
                    }}
                >
                  <img src={this.props.data[id].urls.small} 
                    key={id} 
                    width={this.props.data[id].width}
                    height={this.props.data[id].height}
                    alt={this.props.data[id].description}
                    className='landscape'
                  />
              </div>
            )
          //For Portrait photos
          } else if (this.props.data[id].width < this.props.data[id].height) {
            return (
              <div className='imgSmall' 
                    key={id}
                    onClick={() => {
                      let image = this.props.data[id].urls.full;
                      let smallImage = this.props.data[id].urls.small;
                      let width = this.props.data[id].width;
                      let height = this.props.data[id].height;
                      let fullscreenDataID = this.props.data[id];
                      this.props.showFullScreenImage(image, smallImage, width, height, fullscreenDataID)
                    }}
                >
                  <img src={this.props.data[id].urls.small} 
                    key={id} 
                    width={this.props.data[id].width}
                    height={this.props.data[id].height}
                    alt={this.props.data[id].description}
                    className='portrait'
                  />
              </div>
            )
          }
        })
      ) 
    }else {
        return ( 
          <div>
           {/* empty div  */}
          </div>
        )
    }  
  }
}

export default Card;