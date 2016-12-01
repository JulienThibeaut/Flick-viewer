import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
  selectImageAction, searchMediaAction } from '../actions/mediaActions';
import PhotoPage from '../components/PhotoPage';
import '../styles/style.css';

// MediaGalleryPage Component
class MediaGalleryPage extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
  }

  // Dispatches *searchMediaAction*  immediately after initial rendering
 componentDidMount() {
    this.props.dispatch(searchMediaAction('rain'));
  }

  // Dispatches *selectImageAction* when any image is clicked
  handleSelectImage(selectedImage) {
    this.props.dispatch(selectImageAction(selectedImage));
  }

  // Dispatches *searchMediaAction* with query param.
  // We ensure action is dispatched to the store only if query param is provided.
  handleSearch(event) {
    event.preventDefault();
    if (this.query !== null) {
      this.props.dispatch(searchMediaAction(this.query.value));
      this.query.value = '';
    }
  }

  render() {
    const { images, selectedImage } = this.props;
    return (
      <div className="container-fluid">
        {images ? <div>
          <input
            type="text"
            ref={ref => (this.query = ref)}
          />
          <input
            type="submit"
       className="btn btn-primary"
            value="Search Library"
            onClick={this.handleSearch}
          />
          <div className="row">
            <PhotoPage
              images={images}
              selectedImage={selectedImage}
              onHandleSelectImage={this.handleSelectImage}
            />
          </div>
        </div> : 'loading ....'}
      </div>
    );
  }
}

// Define PropTypes
MediaGalleryPage.propTypes = {
  images: PropTypes.array,
  selectedImage: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

 // Subscribe component to redux store and merge the state into component's props
const mapStateToProps = ({ images }) => ({
  images: images[0],
  selectedImage: images.selectedImage
});

// connect method from react-router connects the component with redux store
export default connect(
  mapStateToProps)(MediaGalleryPage);
