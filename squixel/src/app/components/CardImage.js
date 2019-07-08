import React, {Component} from 'react';
import ReactImageAppear from './ReactImageAppear';

class CardImage extends Component   {
    render () {
        return (
            <div 
              className='imgSmall' 
              image = {this.props.image}
              smallImage = {this.props.smallImage}
              fullscreen_data_id = {this.props.fullscreenDataID}
              photo_id = {this.props.photo_id}
              // className={this.props.className}
              onClick={() => {
                this.props.showFullScreenImage(this.props.image, this.props.smallImage, this.props.fullscreen_data_id, this.props.photo_id)
              }}
            >
                    {/* <img src={this.props.img_src} 
                      // key={this.props.key} 
                      alt={this.props.alt}
                      className={this.props.className}
                    /> */}
                    <ReactImageAppear 
                        src={this.props.img_src}
                        key={this.props.key}
                        animation="fadeIn"
                        animationDuration="1s"
                        alt={this.props.alt}
                        placeholderClass={this.props.className}
                        ref={this.image} onLoad={this.props.updateLoaded}
                    />
                </div>
        )
    }
}

export default CardImage