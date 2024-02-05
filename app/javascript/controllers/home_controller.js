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
    axios.get(url_icon, config)
      .then(function (response) {
        var investments = document.getElementsByName("invest");
        let res = response.data
        investments.forEach(element => {
          var asset = element.children[1].innerHTML;
          var icon  = res.find((element) => element.asset_id === asset).url;
          var imag  = new Image(32,32);
          imag.src  = icon; 
          document.getElementById(asset).appendChild(imag);
        });
      }
    ).catch(function (error) {
      console.log(error)
    });

    // axios.get(url_btc, config).then(function (response){console.log(response.data[0])}).catch(function (error) {console.log(error)});
  }
}