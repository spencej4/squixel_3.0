import React, {Component} from 'react';
import RelatedSearchOptions from './relatedSearchOptions.js';

class DisplaySearchInput extends Component {
    render() {
        let searchTerm = (this.props.searchValueToDisplay.charAt(0).toUpperCase() + this.props.searchValueToDisplay.slice(1));
        if (this.props.loading) {
            return (
                <div className='inputContainer'>
                    <div className='input-term'>
                        <p><span className='display-input-value'>{searchTerm}</span></p>
                    </div>
                </div>
            )
        } else if (this.props.data == '' || this.props.data == 'undefined' || this.props.data == []) {
            return (
                <div className='inputContainer'>
                    <div className='input-term'>
                        <p><span className='display-input-value'>{searchTerm}</span></p>
    
                        <div className='noResultsContainer'>
                            <h1 className='no-results-message'>No Results Found</h1>
                        </div>
                    </div>
                </div>
            )
        }else {
            return (
                <div className='inputContainer'>
                    <div className='input-term'>
                        <p><span className='display-input-value'>{searchTerm}</span></p>

                        <div className='relatedSearchContainer'>
                        <RelatedSearchOptions
                            relatedSearchTags={this.props.relatedSearchTags}
                            onRelatedSearchClick={this.props.onRelatedSearchClick}
                        ></RelatedSearchOptions>
                    </div>
                    </div>
                </div>
            )
        }
    }
}

export default DisplaySearchInput;