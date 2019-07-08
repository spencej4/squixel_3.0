import React, {Component} from 'react';
import CardImage from './CardImage.js';

class Card extends Component   {
  constructor(props) {
    super(props);
    this.state = {
      loadedImageCount: 0
    }
    this.updateLoaded = this.updateLoaded.bind(this);
  }

  updateLoaded() {
    console.log('updateLoaded called!');

    this.setState(prevState => {
      return {loadedImageCount: prevState.loadedImageCount + 1}
    });
  }
  
  componentWillMount() {
    window.scrollTo(0, 0) 
  }

  componentDidMount() { 
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
  }


  render () {  
    if (this.props.loading === false) { 
        return (
              this.props.data.map((item, id) => {
                //For landscape photos
                if (this.props.data[id].width > this.props.data[id].height){
                  return (
                    <CardImage 
                      id={this.props.data[id]}
                      key={id}
                      showFullScreenImage={this.props.showFullScreenImage}
                      smallImage={this.props.data[id].urls.small}
                      image = {this.props.data[id].urls.full}
                      fullscreenData = {this.props.data[id]}
                      img_src={this.props.data[id].urls.small} 
                      width={this.props.data[id].width}
                      height={this.props.data[id].height}
                      alt={this.props.data[id].description}
                      className='landscape'
                      updateLoaded={this.updateLoaded}
                    />
                    // original one here.
                  )
                //For Portrait photos
                } else if (this.props.data[id].width < this.props.data[id].height) {
                  return (
                    <CardImage 
                      id={this.props.data[id]}
                      // original
                      key={id}
                      showFullScreenImage={this.props.showFullScreenImage}
                      smallImage = {this.props.data[id].urls.small}
                      image = {this.props.data[id].urls.full}
                      img_src={this.props.data[id].urls.small} 
                      width={this.props.data[id].width}
                      height={this.props.data[id].height}
                      alt={this.props.data[id].description}
                      className='portrait'
                      updateLoaded={this.updateLoaded}
                    />
                    // original two here
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
        // return null
    }  
  }
}

export default Card;

// --------------------------------------------------------original one
                // <div className='imgSmall' 
                //       key={id}
                //       onClick={() => {
                //         let image = this.props.data[id].urls.full;
                //         let smallImage = this.props.data[id].urls.small;
                //         let width = this.props.data[id].width;
                //         let height = this.props.data[id].height;
                //         let fullscreenData = this.props.data[id];
                //         this.props.showFullScreenImage(image, smallImage, width, height, fullscreenData)
                //       }}
                //   >
                //     <img src={this.props.data[id].urls.small} 
                //       key={id} 
                //       width={this.props.data[id].width}`
                //       height={this.props.data[id].height}
                //       alt={this.props.data[id].description}
                //       className='landscape'
                //     />
                // </div>
                // --------------------------------------------------------end original one


// --------------------------------------------------------original two
                // <div className='imgSmall' 
                //       key={id}
                //       onClick={() => {
                //         let image = this.props.data[id].urls.full;
                //         let smallImage = this.props.data[id].urls.small;
                //         let width = this.props.data[id].width;
                //         let height = this.props.data[id].height;
                //         let fullscreenDataID = this.props.data[id];
                //         this.props.showFullScreenImage(image, smallImage, width, height, fullscreenDataID)
                //       }}
                //   >
                //     <img src={this.props.data[id].urls.small} 
                //       key={id} 
                //       width={this.props.data[id].width}
                //       height={this.props.data[id].height}
                //       alt={this.props.data[id].description}
                //       className='portrait'
                //     />
                // </div>
                // --------------------------------------------------------end original two