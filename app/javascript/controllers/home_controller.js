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
    var investments = document.getElementsByName("invest");
    axios.get(url_icon, config)
      .then(function (response) {
        // var investments = document.getElementsByName("invest");
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

    // investments.forEach(element => {
    //   var url = 'https://rest.coinapi.io/v1/assets/';
    //   url     = url.concat(element.children[1].innerHTML);
    //   setTimeout(console.log.bind(null, 'Two second later'), 2000);
    //   axios.get(url, config)
    //   .then(function (response){

    //     // console.log(response.data[0])

    //   }).catch(function (error) {console.log(error)});
    // })

    const buildImg = (asset, icon) => {
      var imag  = new Image(32,32);
      imag.src  = icon; 
      document.getElementById(asset).appendChild(imag);
    };
  }
}