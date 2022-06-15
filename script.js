window.onload = async function () {
  if (localStorage.getItem("dataLocalStorage")) {
    let usableStorageData = localStorage.getItem("dataLocalStorage");
  } else {
    const request = await fetch(
      "./data/cessions-immobilieres-de-letat-copie.geojson"
    )
      .then((response) => response.json())
      .then((response) => response.features)
      .catch((error) => alert("Error : " + error));
    const response = await request;
    /*  localStorage.setItem("dataLocalStorage", response); */
    let array2013 = 0;
    let array2014 = 0;
    let array2015 = 0;
    let array2016 = 0;
    let array2017 = 0;
    let arrayOther = 0;
    for (let i = 0; i < response.length; i++) {
      if (response[i].properties.annee_cession == "2013") {
        array2013++;
      } else if (response[i].properties.annee_cession == "2014") {
        array2014++;
      } else if (response[i].properties.annee_cession == "2015") {
        array2015++;
      } else if (response[i].properties.annee_cession == "2016") {
        array2016++;
      } else if (response[i].properties.annee_cession == "2017") {
        array2017++;
      } else {
        arrayOther++;
      }
    }
    arrayGlobal = array2013 + array2014 + array2015 + array2016 + array2017;
    const barCanvasOne = document.getElementById("barCanvasOne");
    const barCanvasTwo = document.getElementById("barCanvasTwo");
    const barCanvasThree = document.getElementById("barCanvasThree");
    const barCanvasFourth = document.getElementById("barCanvasFourth");
    let barArray = [
      barCanvasOne,
      barCanvasTwo,
      barCanvasThree,
      barCanvasFourth,
    ];


    x = 0;
    moin = 0;
    zero = 0;
    un = 0;
    deux = 0;
    trois = 0;
    quatre = 0;
    autre = 0;

    while (x < response.length) {
        // console.log(response[x].properties.annee_de_1ere_inscription);
        // console.log(response[x].properties.annee_cession);
        tempsdevente = response[x].properties.annee_cession - response[x].properties.annee_de_1ere_inscription;     
        if (tempsdevente < 0) {
            moin++;
        }
        else if (tempsdevente == 0) {
            zero++;
        } else if (tempsdevente == 1) {
            un++;
        } else if (tempsdevente == 2) {
            deux++;
        } else if (tempsdevente == 3) {
            trois++;
        } else if (tempsdevente == 4) {
            quatre++;
        } else if (tempsdevente > 4) {
            autre++;
        }
        x++;
    }
    arraySum0 = Math.floor(zero/x*100)
    arraySum1 = Math.floor(un/x*100)
    arraySum2 = Math.floor(deux/x*100)
    arraySum3 = Math.floor(trois/x*100)
    arraySum4 = Math.floor(quatre/x*100)
    arraySum5 = Math.floor(autre/x*100)


/* CALCUL DEPARTMENTS */

    const departement = {};
    for (x = 0; x < response.length; x = x + 1) {
        if (departement[response[x].properties.dep_name] !== undefined) {
            departement[response[x].properties.dep_name] = departement[response[x].properties.dep_name] + 1;
        } else {
            departement[response[x].properties.dep_name] = 1;
        }
    }


    sortProperties(departement)


    function sortProperties(ville) {
        // convert object into array
        var sortable = [];
        for (var key in ville)
            if (ville.hasOwnProperty(key))
                sortable.push([key, ville[key]]); // each item is an array in format [key, value]

        // sort items by value
        sortable.sort(function (a, b) {
            return a[1] - b[1]; // compare numbers
        });
        return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
    }

    x = 1;
    dataDepartmentsArray = [];
    dataDepartmentsNumberArray = [];
    while (x < /* sortProperties(departement).length */ 50) {
      if(sortProperties(departement)[sortProperties(departement).length - x][0] !== "undefined"){
        dataDepartmentsArray.push(sortProperties(departement)[sortProperties(departement).length - x][0]);
        dataDepartmentsNumberArray.push(sortProperties(departement)[sortProperties(departement).length - x][1]);
      }
     
        x = x + 1;
    }

/* MINISTERE CHART */

 /*  localStorage.setItem("dataLocalStorage", response); */
 let arrayMinist0 = 0;
 let arrayMinist1 = 0;
 let arrayMinist2 = 0;
 let arrayMinist3 = 0;
 let arrayMinist4 = 0;
 let arrayMinist5 = 0;
 let arrayMinist6 = 0;
 let arrayMinist7 = 0;
 let arrayMinist8 = 0;
 let arrayMinist9 = 0;
 let arrayMinist10 = 0;
 let arrayMinist11 = 0;
 let otherMinist = 0;
 for (let i = 0; i < response.length; i++) {
   if (response[i].properties.ministere_occupant == "Minist\u00e8re de l'\u00e9cologie, du d\u00e9veloppement durable, des transports et du logement") {
    arrayMinist0++;
   } else if (response[i].properties.ministere_occupant == "Minist\u00e8re du budget, des comptes publics et de la r\u00e9forme de l'Etat") {
    arrayMinist1++;
   } else if (response[i].properties.ministere_occupant == "Minist\u00e8re de la justice et des libert\u00e9s") {
    arrayMinist2++;
   } else if (response[i].properties.ministere_occupant == "Minist\u00e8re de l'agriculture et de la p\u00eache") {
    arrayMinist3++;
   } else if (response[i].properties.ministere_occupant == "Minist\u00e8re de la d\u00e9fense") {
    arrayMinist4++;
   } else if(response[i].properties.ministere_occupant == "Minist\u00e8re du Travail, des relations sociales, de la famille et de la solidarit\u00e9"){
    arrayMinist5++;
   }else if(response[i].properties.ministere_occupant == "Minist\u00e8re de l'int\u00e9rieur, de l'Outre-mer et des collectivit\u00e9s territoriales"){
    arrayMinist6++;
  }else if(response[i].properties.ministere_occupant == "Minist\u00e8re de l'\u00e9conomie, de l'industrie et de l'emploi"){
    arrayMinist7++;
  }else if(response[i].properties.ministere_occupant == "Minist\u00e8re du budget, des comptes publics et de la r\u00e9forme de l'Etat"){
    arrayMinist8++;
  }else if(response[i].properties.ministere_occupant == "Minist\u00e8re du logement et de la ville"){
    arrayMinist9++;
  }else if(response[i].properties.ministere_occupant == "Minist\u00e8re des affaires \u00e9trang\u00e8res et europ\u00e9ennes"){
    arrayMinist10++;
  }else if(response[i].properties.ministere_occupant == "Biens non affect\u00e9s"){
    arrayMinist11++;
  }else{
otherMinist++

  }
 }

console.log(otherMinist)


    /* COLOR GRADIENT CHART */
    var bar_ctx = document.getElementById('barCanvasOne').getContext('2d');

    var background_1 = bar_ctx.createLinearGradient(0, 0, 0, 600);
    background_1.addColorStop(0, '#186da2');
    background_1.addColorStop(1, '#00d4ff');

    var background_2 = bar_ctx.createLinearGradient(0, 0, 0, 600);
    background_2.addColorStop(0, '#1aacde');
    background_2.addColorStop(1, '#35d2ef');

    var background_3 = bar_ctx.createLinearGradient(0, 0, 0, 600);
    background_3.addColorStop(0, '#1cd5d5');
    background_3.addColorStop(1, '#38eaea');

    var background_4 = bar_ctx.createLinearGradient(0, 0, 0, 600);
    background_4.addColorStop(0, '#a4f8e9');
    background_4.addColorStop(1, '#a4f8ea');

    var background_5 = bar_ctx.createLinearGradient(0, 0, 0, 600);
    background_5.addColorStop(0, '#cbf9ef');
    background_2.addColorStop(1, '#e5fcf7');
    
/* DISPLAY CHART */
for (let i = 0; i < barArray.length; i++) {
if(i == 0){
  new Chart(barArray[i], {
    type: "bar",
    data: {
      labels: ["2013", "2014", "2015", "2016", "2017"],
      datasets: [
        {
          data: [array2013, array2014, array2015, array2016, array2017],
          backgroundColor: [background_1, background_2, background_3, background_4, background_5],
        },
      ],
    },
    options: {
      plugins: {
        title: {
            display: true,
            text: 'Nombre de ventes pas années'
        }
    },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }, 
      scales: {
        y: {
          /* suggestedMax: 2000, */
          ticks: {
            font: {
              size: 18,
            },
          },
        },
      },
    },
  });
}else if(i == 1){
  new Chart(barArray[i], {
    type: "line",
    data: {
      labels: ["vendu la même année", "vendu apres 1 an", "vendu apres 2 ans", "vendu apres 3 ans", "vendu apres 4 ans", "vendu au dela de la 4eme annee"],
      datasets: [
        {
          data: [arraySum0, arraySum1, arraySum2, arraySum3, arraySum4, arraySum5],
          backgroundColor: ["black"],
          borderColor:[background_1]
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }, 
      plugins: {
        title: {
          display: true,
          text: 'Nombre de vente en fonction de la durée'
      },
        tooltip: {
          callbacks: {
            label: function(context){
              var label = context.label,
                  currentValue = context.raw
                  return label + ": " +currentValue + ''  + '%';
            }
          }
        }
      },
      scales: {
        y: {
          
          /* suggestedMax: 2000, */
          ticks: {       
            callback: function(value, index, values) {
              return ((value / 100) * 100) + '%';
          },
            font: {
              size: 18,
            },
          },
        },
      },
    },
  });
}else if(i == 2){
  new Chart(barArray[i], {
    type: "bar",
    data: {
      labels: dataDepartmentsArray,
      datasets: [
        {
          data: dataDepartmentsNumberArray,
          backgroundColor: [background_1],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Nombre de vente par départements'
      }},
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }, 
      scales: {
        y: {
          /* suggestedMax: 2000, */
          ticks: {
            font: {
              size: 18,
            },
          },
        },
      },
    },
  });
}else if(i == 3){
  new Chart(barArray[i], {
    type: "doughnut",
    data: {
      labels: ["Minist\u00e8re de l'\u00e9cologie, du d\u00e9veloppement durable, des transports et du logement","Minist\u00e8re du budget, des comptes publics et de la r\u00e9forme de l'Etat", "Minist\u00e8re de la justice et des libert\u00e9s","Minist\u00e8re de l'agriculture et de la p\u00eache","Minist\u00e8re de la d\u00e9fense","Minist\u00e8re du Travail, des relations sociales, de la famille et de la solidarit\u00e9","Minist\u00e8re de l'int\u00e9rieur, de l'Outre-mer et des collectivit\u00e9s territoriales","Minist\u00e8re de l'\u00e9conomie, de l'industrie et de l'emploi","Minist\u00e8re du logement et de la ville","Minist\u00e8re des affaires \u00e9trang\u00e8res et europ\u00e9ennes","Biens non affect\u00e9s"],
      datasets: [
        {
          data: [arrayMinist0, arrayMinist1,arrayMinist2,arrayMinist3,arrayMinist4,arrayMinist5,arrayMinist6,arrayMinist7,arrayMinist8,arrayMinist10,arrayMinist11],
          backgroundColor: ["rgb(0, 179, 0)", "rgb(180, 179, 1)","rgb(0, 0, 178)","rgb(0, 255, 0)","rgb(100, 103, 112)","rgb(255, 153, 255)","rgb(204, 0, 35)","rgb(255, 255, 1)","rgb(29, 208, 236)","rgb(253, 1, 0)","rgb(44, 46, 52)"],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Nombre de vente par ministeres'
      }},
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }, 
      scales: {
        y: {
          /* suggestedMax: 2000, */
          ticks: {
            font: {
              size: 18,
            },
          },
        },
      },
    },
  });
}
}
   
  }
};
