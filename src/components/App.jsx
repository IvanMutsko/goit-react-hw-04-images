import { Component } from 'react';
import { fetchAPI } from 'api/api';

import { AppBox } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { ModalWindow } from './ModalWindow/ModalWindow';
import { Loader } from './Loader/Loader';

class App extends Component {
  state = {
    images: [],
    searchWord: '',
    page: 1,
    total: 1,
    largeImageURL: '',
    imageTags: '',
    loading: false,
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchWord, page } = this.state;

    if (prevState.searchWord !== searchWord || prevState.page !== page) {
      this.fetchPhotos(searchWord, page);
    }
  }

  onSubmitForm = searchQuery => {
    if (!searchQuery) return;
    this.setState({
      searchWord: searchQuery,
      images: [],
      page: 1,
    });
  };

  fetchPhotos = async (searchWord, page) => {
    try {
      this.setState({ loading: true, error: null });
      const fetchedPhotos = await fetchAPI(searchWord, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...fetchedPhotos.hits],
        total: fetchedPhotos.totalHits,
      }));
    } catch (error) {
      this.setState({
        error: 'An error occurred, please try again later...',
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  onLoadMore = () => {
    this.setState(prevPage => ({
      page: prevPage.page + 1,
    }));
  };

  toggleModal = (largeImage = '', tags = '') => {
    this.setState(() => {
      return {
        largeImageURL: largeImage,
        imageTags: tags,
      };
    });
  };

  render() {
    const { loading, images, error, total, page, largeImageURL, imageTags } =
      this.state;

    return (
      <>
        <AppBox>
          <Searchbar onSubmit={this.onSubmitForm} />

          <ImageGallery>
            <ImageGalleryItem images={images} toggleModal={this.toggleModal} />
          </ImageGallery>

          {error && <h2>{error}</h2>}

          {total === 0 && (
            <h2 style={{ textAlign: 'center' }}>Sorry, nothing was found...</h2>
          )}

          {total / 12 > page && !loading && (
            <Button text="Load more" onClick={this.onLoadMore} />
          )}
        </AppBox>

        {loading && <Loader />}

        {largeImageURL && (
          <ModalWindow
            imageURL={largeImageURL}
            imageTags={imageTags}
            toggleModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}

export default App;
