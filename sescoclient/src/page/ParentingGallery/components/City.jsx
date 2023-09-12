import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './city.css'


function City({cityName}) {
  return (
    <Card className='city-img-box' >
      <Card.Img  variant="top"  src="/yeosu.jpg" />
      <Card.Body>
        <Card.Title>{cityName}</Card.Title>
        <Card.Text>
          Some quick 
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default City;