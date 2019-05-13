import React, {Component} from 'react';

class Card extends Component   {

  componentDidMount(){
  }

  render () {
    if (this.props.loading === false) {
      return (
        this.props.data.map((item, id) => {
          //For landscape photos
          if (this.props.data[id].width > this.props.data[id].height){
            return (
              <div className='imgSmall' 
                    key={id}
                    onClick={() => {
                      let image = this.props.data[id].urls.full;
                      let width = this.props.data[id].width;
                      let height = this.props.data[id].height;
                      let fullscreenData = this.props.data[id];
                      this.props.showFullScreenImage(image, width, height, fullscreenData)
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
                      let width = this.props.data[id].width;
                      let height = this.props.data[id].height;
                      let fullscreenData = this.props.data[id];
                      this.props.showFullScreenImage(image, width, height, fullscreenData)
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