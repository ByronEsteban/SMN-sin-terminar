let props = {
  humidity: 'Humedad',
  wind_speed: 'Velocidad del viento',
  wing_deg: 'Dirección del viento',
  temp: 'Temperatura',
  description: 'Descripción'
}

let a = {
  Despejado: '🌞',
  'Algo nublado': '⛅'
}

const url = 'https://ws.smn.gob.ar/map_items/weather';
let weatherStation = 'Rosario';
document.body.children[1].value = '';

document.addEventListener('DOMContentLoaded', init());

function init(){
  fetch(url)
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      //aca va lo que queremos hacer
      console.log(weatherStation);
      console.log(document.body.children[1]);
      weatherStation = document.body.children[1].value || weatherStation;
      console.log(weatherStation);
      let filteredData = data.filter(item => item.name == weatherStation)[0];
      if (!filteredData) {
        document.body.children[1].value = '';
        let alert = document.createElement('h2');
        alert.textContent = 'No existe esa estación';
        document.body.append(alert);
        setTimeout(() =>{
          alert.remove();
        }, 2000);
        console.log('No existe esa estación');
        return false;
      }
      //console.log(filteredData.weather);
      let stationName = filteredData.name;
      // let {
      //   humidity,
      //   temp,
      //   description,
      //   wind_speed,
      //   wind_deg
      // } = filteredData.weather;
      let container = document.getElementById('container');
      container.innerHTML = '';
      let title = document.createElement('h2');
      title.textContent = stationName;
      container.append(title);
      console.log(filteredData.weather);
      delete filteredData.weather.id;
      delete filteredData.weather.st;
      delete filteredData.weather.tempDesc;
      delete filteredData.weather.visibility;
      delete filteredData.weather.pressure;
      for (let key in filteredData.weather) {
        if (key == 'description') {
          let emoji = document.createElement('div');
          emoji.textContent = a[filteredData.weather[key]];
          container.append(emoji);
        }
        let div = document.createElement('div');
        div.textContent =  `${props[key]}: ${filteredData.weather[key]}`;
        container.append(div);
      }
    })
    .catch(err => console.log(err));
}
