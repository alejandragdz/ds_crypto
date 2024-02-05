import { Controller } from "@hotwired/stimulus"

let url_icon   = 'https://rest.coinapi.io/v1/assets/icons/1';
let url_btc    = 'https://rest.coinapi.io/v1/assets/BTC';
let url_ada    = 'https://rest.coinapi.io/v1/assets/ADA';
let url_eth    = 'https://rest.coinapi.io/v1/assets/ETH';
let url_assets = 'https://rest.coinapi.io/v1/assets';

let config   = {
  headers: { 
    'Accept': 'text/plain', 
    'X-CoinAPI-Key': '5D09BD4F-8A31-4E88-B8B6-E2B126B29F85'
  }
};

// Connects to data-controller="home"
export default class extends Controller {
  connect() {
    var investments = document.getElementsByName("invest");
    axios.get(url_icon, config)
      .then(function (response) {
        let res = response.data
        investments.forEach(element => {
          var asset = element.children[1].innerHTML;
          var icon  = res.find((element) => element.asset_id === asset).url;

          buildImg(asset, icon);
        });
      }
    ).catch(function (error) {
      console.log(error)
    });

    axios.get(url_assets, config)
      .then(function (response) {
        let res = response.data
        investments.forEach(element => {
          var asset = element.children[1].innerHTML;
          var data  = res.find((element) => element.asset_id === asset);

          buildText(asset+"_price", data.price_usd.toFixed(2)+" USD");
        });
      }
    ).catch(function (error) {
      console.log(error)
    });

    const buildImg = (asset, icon) => {
      var imag  = new Image(32,32);
      imag.src  = icon; 
      document.getElementById(asset).appendChild(imag);
    };

    const buildText = (asset, text) => {
      var txt  = new Text(text);
      document.getElementById(asset).appendChild(txt);
    };
  }
}