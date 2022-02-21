const axios = require('axios');


let count = 0;
function reqfun() {
    axios.get('https://www.5296698.top/links/44E742A0')
        .then(response => {
            //   console.log(response.data);
            if (response.data) count++;
            console.log(count);
        })
        .catch(error => {
            console.log(error);
        });
}


for (let i = 0; i < 999; i++) {
    reqfun();
}