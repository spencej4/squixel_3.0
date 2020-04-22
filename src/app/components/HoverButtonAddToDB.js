import React, {Component} from 'react';

class HoverButtonAddToDB extends Component   {
  constructor(props) {
        super(props);
        this.state = {
            log_email: this.props.log_email,
            user_ID: this.props.user_ID,
            smallImage: this.props.smallImage,
            image: this.props.image,
        }
        this.addImageToDatabase = this.addImageToDatabase.bind(this);
        this.removeImageFromDatabase = this.removeImageFromDatabase.bind(this); 
        this.redirectToSignIn = this.redirectToSignIn.bind(this);           
  }
    
    addImageToDatabase (event) {
        event.stopPropagation();
        event.preventDefault();

        let email = this.props.log_email;
        let image = this.state.image;
        let smallImage = this.state.smallImage;
        let imageID =this.props.imageID;

        fetch('/api/add-image/',{
            method: 'PUT',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              image: image,
              smallImage: smallImage,
              imageID: imageID
            }) 
        }).then(response => {
            this.props.createUserImageIDArray();

            return response.json();
        });
    }


    removeImageFromDatabase (event) {
        event.preventDefault();
        event.stopPropagation();


        let email = this.state.log_email;
        let image = event.target.value;
        let imageID = this.props.imageID;
        // console.log(`imageID from within hoverButton removeImage function: ${imageID}`)

        fetch('/api/delete-image',{
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                image: image,
                imageID: imageID
              }) 
          }).then(response => {
            // rebuild userImageIDArray
           this.props.createUserImageIDArray();

            return response.json();
        }).then(function(data){
            // console.log('delete image call worked from HoverButtonAddToDB.js')
            // console.log(data)
        })
    }

    redirectToSignIn(event) {
        event.stopPropagation();
        event.preventDefault();
        this.props.redirectedOnSignInClick();
    }


    render () {
        // if else statements new 04/09/20
        if (this.props.isAuthenticated){
            if(this.props.imageMatchesArray.includes(this.props.imageID)){
                return(
                    <button className='add-to-db-overlay-collected'
                        onClick={this.removeImageFromDatabase}
                        value={this.props.photo}
                        src={this.props.photo}
                    >
                        <img className='largeButtonCollected' src='data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='></img>
                        <p className='normalButton'>Remove</p>
                    </button>
                )
            }else {
                return(
                    <button className='add-to-db-overlay'
                        onClick={this.addImageToDatabase}
                        value={this.props.photo}
                        src={this.props.photo}
                    >
                        <p className='largeButton'>+</p>
                        <p className='normalButton'>Collect</p>
                    </button>
                )
            }
            // new 04/09/20
        }else if(!this.props.isAuthenticated){
            return (
                <button className='add-to-db-overlay'
                    onClick={(event) => this.redirectToSignIn(event)}
                    redirectedOnSignInClick={this.props.redirectedOnSignInClick}
                    value={this.props.photo}
                    src={this.props.photo}
                >
                    {/* <p className='largeButton'>+</p> */}
                    {/* new 04/09/20 */}
                    <p className='normalButtonRedirect'>Sign In</p>
                </button>
            )
        }
    }
}

export default HoverButtonAddToDB