import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './city.css'


function City({imgNameList, cityName, cityList, setSelectedCity}) {

  //사진 포함하고 있는 개수
  const matchCityCount = cityList.filter((name)=>name == cityName).length

  //가장 최근 사진 하나 뽑기
  const firstImgIndex = findFirstIndex(cityList, cityName); 
  const preImgName = imgNameList[firstImgIndex];
  console.log(preImgName)

  
  function findFirstIndex(arr, value) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        return i;
      }
    }
    return -1; // 값이 없는 경우 -1 반환
  }
 

  return (
    <Card className='slider-item' >
      <Card.Img  variant="top"  src= {`data:image/jpeg;base64,${preImgName}`} />
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