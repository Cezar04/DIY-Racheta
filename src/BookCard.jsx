import React, { useState } from 'react';
import { Card, CardTitle, CardImg, CardBody, Button, Modal, Col } from 'reactstrap';
const BookCard = ({
  thumbnail,
  title,
  description,
  authors,
  previewLink,

}) => {
  // States
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Card style={{ width: '300px' }} className='m-auto '>
 
      <CardImg
        top
        style={{ width: '100%', height: '233px' }}
        src={thumbnail}
        alt={title}
      />
    
      <CardBody>
        <CardTitle className='card-title'>{title}</CardTitle>
        <Button onClick={toggle}>More info</Button>
      </CardBody>
      <Modal isOpen={modal} toggle={toggle}>
        <div className='modal-header d-flex justify-content-center'>
          <h5 className='modal-title text-center' id='exampleModalLabel'>
            {title}
          </h5>
          <button
            aria-label='Close'
            className='close'
            type='button'
            onClick={toggle}
          >
            <span aria-hidden={true}>X</span>
          </button>
        </div>
        <div className='modal-body'>
  
          <iframe width="460" 
          height="315" 
          src={`https://www.youtube.com/embed/${previewLink}`}
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          title="video"
          allowFullScreen
          >
        </iframe>
          <div className='mt-3'>{description}</div>
        </div>
      </Modal>
    </Card>
  );
};

export default BookCard;
