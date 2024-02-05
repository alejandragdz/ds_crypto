import { Controller } from "@hotwired/stimulus"

let url_icon = 'https://rest.coinapi.io/v1/assets/icons/1';
let url_btc  = 'https://rest.coinapi.io/v1/assets/BTC';
let url_ada  = 'https://rest.coinapi.io/v1/assets/ADA';
let url_eth  = 'https://rest.coinapi.io/v1/assets/ETH';

let config   = {
  headers: { 
    'Accept': 'text/plain', 
    'X-CoinAPI-Key': '5D09BD4F-8A31-4E88-B8B6-E2B126B29F85'
  }
};

// Connects to data-controller="home"
export default class extends Controller {
  connect() {
    alert("Hola")
    axios.get(url_icon, config)
      .then(function (response) {
        let res = response.data
        let btc = res.find((element) => element.asset_id === "BTC");
        let ada = res.find((element) => element.asset_id === "ADA");
        let eth = res.find((element) => element.asset_id === "ETH");

        var img1 = new Image(32,32);
        var img2 = new Image(32,32);
        var img3 = new Image(32,32);

        img1.src = btc.url
        img2.src = eth.url
        img3.src = ada.url

        document.getElementById("BTC").appendChild(img1);
        document.getElementById("ETH").appendChild(img2);
        document.getElementById("ADA").appendChild(img3);
      }
    ).catch(function (error) {
      console.log(error)
    });

    axios.get(url_btc, config).then(function (response){console.log(response.data[0])}).catch(function (error) {console.log(error)});
  }
}