import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './city.css'


function City({cityName, cityList, setSelectedCity}) {

  //사진 포함하고 있는 개수
  const matchCityCount = cityList.filter((name)=>name == cityName).length

  return (
    <Card className='slider-item' >
      <Card.Img  variant="top"  src="/yeosu.jpg" />
      <Card.Body>
        <Card.Title className='slider-item-title'>{cityName}</Card.Title>
        <Card.Text>
          
            <li>사진 {matchCityCount}개</li>
          
        </Card.Text>
        <Button onClick={()=>setSelectedCity(cityName)} variant="primary">갤러리 탐색</Button>
      </Card.Body>
    </Card>
  );
}

export default City;