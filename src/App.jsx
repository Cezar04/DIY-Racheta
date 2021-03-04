import React, { useState } from 'react';
import './App.css';
import {
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  FormGroup,
  Label,
  Spinner
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import BookCard from './BookCard.jsx';
import Logo from './logo.png';

function App() {
  // States
  const [maxResults, setMaxResults] = useState(10);
  // const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  // Handle Search
  const handleSubmit = () => {
    setLoading(true);
    if (maxResults > 40 || maxResults < 1) {
      toast.error('max results must be between 1 and 40');
    } else {
      axios
        .get(
          
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=diy+${query}&maxResults=${maxResults}&key=AIzaSyDNwKRXFQrkkoKwGgPiieAJEljR4HtYVrY`
        )
        .then(res => {
            if (res.data.items.length > 0) {
              setCards(res.data.items);
              setLoading(false);
            }
          
        })
        .catch(err => {
          setLoading(true);
          console.log(err.response);
        });
    }
  };
  // Main Show Case
  const mainHeader = () => {
    return (
      <div className='main-image d-flex justify-content-center align-items-center flex-column'>
        {/* Overlay */}
        <div className='filter'></div>
        <img src={Logo}/>
        <h1
          className='display-2 text-center text-white mb-3'
          style={{ zIndex: 2 }}
        >
         
          Learn by doing it
        </h1>
      
        <div style={{ width: '60%', zIndex: 2 }}>
          <InputGroup size='lg' className='mb-3'>
            <Input
              placeholder='Search'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <InputGroupAddon addonType='append'>
              <Button color='secondary' onClick={handleSubmit}>
                <i className='fas fa-search'></i>
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <div className='d-flex text-white justify-content-center'>
            <FormGroup >
              <Label for='maxResults'>Max Results</Label>
              <Input
                type='number'
                id='maxResults'
                placeholder='Max Results'
                value={maxResults}
                onChange={e => setMaxResults(e.target.value)}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    );
  };

  const handleCards = () => {
    if (loading) {
      return (
        <div className='d-flex justify-content-center mt-3'>
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div>
      );
    } else {
      const items = cards.map((item, i) => {
        let thumbnail = '';
        
          thumbnail = item.snippet.thumbnails.default.url;
        

        return (
          <div className='col-lg-4 mb-3' key={item.id}>
            <BookCard
              thumbnail={thumbnail}
              title={item.snippet.title}
              authors={item.snippet.thumbnails.channelTitle}     
              description={item.snippet.description}
              previewLink={item.id.videoId}
            />
          </div>
        );
      });
      return (
        <div className='container my-5'>
          <div className='row'>{items}</div>
        </div>
      );
    }
  };
  return (
    <div className='w-100 h-100'>
      {mainHeader()}
      {handleCards()}
      <ToastContainer />
    </div>
  );
}

export default App;
