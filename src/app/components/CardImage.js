import React, {Component} from 'react';
import ReactImageAppear from './ReactImageAppear';
import HoverButtonAddToDB from './HoverButtonAddToDB';


class CardImage extends Component   {
  // new 01/25/20
  constructor(props) {
        super(props);
        this.state = {
            log_email: this.props.log_email,
            user_ID: this.props.user_ID,
        } 
  }


    getInitialState() {
      return {
        isMouseInside: false
      };
    }

    mouseEnter = () => {    
      // works...
      // let photo_id = this.props.id.id
      // alert(photo_id);
      this.setState({ isMouseInside: true });
    }


    mouseLeave = () => {
      this.setState({ 
        isMouseInside: false 
      });
    }

   
    render () {
        let imageID = this.props.id.id;

        return (
            <div 
              className='imgSmall' 
              image = {this.props.image}
              key={this.props.id.id}
              smallImage = {this.props.smallImage}
              imageID = {this.props.imageID}

              onClick={() => {
                this.props.showFullScreenImage(this.props.image, this.props.smallImage, this.props.imageID)}}
              onMouseEnter={() => this.mouseEnter()} 
              onMouseLeave={this.mouseLeave}
              createUserImageIDArray={this.props.createUserImageIDArray}
              imageMatchesArray={this.props.imageMatchesArray}
            >       

              {this.state.isMouseInside ? <HoverButtonAddToDB
                  isAuthenticated={this.props.isAuthenticated}
                  redirectedOnSignInClick={this.props.redirectedOnSignInClick}
                  imageID = {this.props.imageID}
                  log_email={this.props.log_email}
                  user_ID={this.props.user_ID}
                  image = {this.props.image}
                  smallImage = {this.props.smallImage}
                  value={this.props.photo}
                  src={this.props.photo}
                  createUserImageIDArray={this.props.createUserImageIDArray}
                  imageMatchesArray={this.props.imageMatchesArray}
                ></HoverButtonAddToDB> : null}


                <ReactImageAppear 
                  src={this.props.img_src}
                  className={this.props.className}
                  key={this.props.key}
                  animation="fadeIn"
                  animationDuration="1s"
                  alt={this.props.alt}
                  placeholderClass={this.props.className}
                  ref={this.image} onLoad={this.props.updateLoaded} 
                ></ReactImageAppear>
              </div>
        )
    }
}

export default CardImage