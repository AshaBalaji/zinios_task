const endpoint = 'http://dummy.restapiexample.com/api/v1/employees';
let names = [];
var searchInput = document.getElementById('search');
var displayList = document.querySelector('.list');

fetch(endpoint)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
      names = data.data;
      displayData(names);
  });

function displayData(dataArr) {
  var html = dataArr.map(function(item) {
    return `<div class="item">
                <div class="item-profile"><img src="img/profile_icon.png" alt=""></div>
                <div class="item-details">
                    <div class="item-name">${item.employee_name}</div>
                    <div class="item-other"><span class="item-age">Age: ${item.employee_age}</span> <span class="item-salary">Salary: ${item.employee_salary}</span></div>
                </div>
            </div>`;
  }).join('');
  displayList.innerHTML = html; 
}

function findMatch(matchWord, names) {
    return names.filter(name => {
        const regex = new RegExp(matchWord, 'gi');
        return name.employee_name.match(regex)
    }) 
}

function handleEvent() {
  var filterArray = findMatch(this.value, names);
  displayData(filterArray);
}

searchInput.addEventListener('keyup', handleEvent);

function sortData(ID) {
  var filterArray = [];
  if(ID === "default") {
    filterArray = names.sort(function(a,b) {
      return parseFloat(a.id) - parseFloat(b.id);
    })
  } else if(ID === "name") {
    filterArray = names.sort(function(a,b) {
      return (a.employee_name > b.employee_name) ? 1 : ((b.employee_name > a.employee_name) ? -1 : 0);
    })
  } else if(ID === "age") {
    filterArray = names.sort(function(a,b) {
      return parseFloat(a.employee_age) - parseFloat(b.employee_age);
    })
  } else if(ID === "salary") {
    filterArray = names.sort(function(a,b) {
      return parseFloat(a.employee_salary) - parseFloat(b.employee_salary);
    })
  }
  displayData(filterArray);
}