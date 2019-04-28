import React, { Component } from 'react';
import Card from './card';

class Wrapper extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

    render() {
      return (
        <div className='body-container'>
            <div className='wrapperDiv'>
                {this.props.showCard ? (
                    <Card data={this.props.data}
                    loading={this.props.loading}
                    photos={this.props.photos}
                    showFullScreen={this.props.showFullScreen}
                    showFullScreenImage={this.props.showFullScreenImage}
                    fullScreenImage={this.props.fullScreenImage}
                    />
                ) : (null)
                } 
            </div>
        </div>
      );
    }  
}

export default Wrapper