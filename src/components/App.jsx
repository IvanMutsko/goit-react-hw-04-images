import { useState, useEffect } from 'react';
import { fetchAPI } from 'api/api';

import { AppBox } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { ModalWindow } from './ModalWindow/ModalWindow';
import { Loader } from './Loader/Loader';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imageTags, setImageTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPhotos = async (searchWord, page) => {
    try {
      setLoading(true);
      setError(null);

      const fetchedPhotos = await fetchAPI(searchWord, page);

      setImages(prevImages => [...prevImages, ...fetchedPhotos.hits]);
      setTotal(fetchedPhotos.totalHits);
    } catch (error) {
      setError('An error occurred, please try again later...');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchWord) {
      return;
    }
    fetchPhotos(searchWord, page);
  }, [page, searchWord]);

  const onSubmitForm = searchQuery => {
    if (!searchQuery) return;

    setSearchWord(searchQuery);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  const toggleModal = (largeImage = '', tags = '') => {
    setLargeImageURL(largeImage);
    setImageTags(tags);
  };

  return (
    <>
      <AppBox>
        <Searchbar onSubmit={onSubmitForm} />

        <ImageGallery>
          <ImageGalleryItem images={images} toggleModal={toggleModal} />
        </ImageGallery>

        {error && <h2>{error}</h2>}

        {total === 0 && (
          <h2 style={{ textAlign: 'center' }}>Sorry, nothing was found...</h2>
        )}

        {total / 12 > page && !loading && (
          <Button text="Load more" onClick={onLoadMore} />
        )}
      </AppBox>

      {loading && <Loader />}

      {largeImageURL && (
        <ModalWindow
          imageURL={largeImageURL}
          imageTags={imageTags}
          toggleModal={toggleModal}
        />
      )}
    </>
  );
};

export default App;
