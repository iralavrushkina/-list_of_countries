const countries = document.querySelector('.main__countries');
const inputSearch = document.querySelector('.main__inputSearch');
const selectBtn = document.querySelector('.main__filter');
const darkModeBtn = document.querySelector('.header__btnDarkMode');
const lightModeBtn = document.querySelector('.header__btnLightMode');
const iconSearch = document.querySelector('.main__iconSearch');

fetch('https://restcountries.com/v2/all')  
.then(response => response.json())
.then(result => loadCountries(result))

const loadCountries = data =>{
    let country = ' ';
    data.forEach(element => {
        country += `<div class="main__countryCard light ${element.region} ${element.name} ">
        <img src="${element.flags.png}">
        <div class="main__countryInfo light">
            <h2 class="main__countryName light">${element.name}</h2>
            <ul>
                <li><span class="main__textLi light">Population:</span>${element.population}</li>
                <li><span class="main__textLi light">Region:</span>${element.region}</li>
                <li><span class="main__textLi light">Captial:</span>${element.capital}</li>
            </ul>
        </div>
    </div>`
    });
    countries.innerHTML = country;
}

/*d 2.6 була така ж логiка і ти пропонував вкреписати за доромогою reduce
ось що вийшло в мене. Але я розумію, що не так, бо сторінка дуже довго завантажується

const loadCountries = data =>{
    data.reduce((country,element)=> {
        country += `<div class="main__countryCard ${element.region} ${element.name}">
        <img src="${element.flags.png}">
        <div class="main__countryInfo">
            <h2 class="main__countryName">${element.name}</h2>
            <ul>
                <li><span class="main__textLi">Population:</span>${element.population}</li>
                <li><span class="main__textLi">Region:</span>${element.region}</li>
                <li><span class="main__textLi">Captial:</span>${element.capital}</li>
            </ul>
        </div>
    </div>`
    return countries.innerHTML = country;
    },'');

    
}
*/
const getValue = s => document.querySelector(s).value;

const ucFirst = str => {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  }

const filter = (category, items) => {
    items.forEach((item) => {
        const isItemFiltered = !item.classList.contains(ucFirst(category));
        const isShowAll = category === 'Filter by Region'
        if (isItemFiltered && !isShowAll) {
            item.classList.add('hide')
        } else {
            item.classList.remove('hide')
        }
    })
}
selectBtn.addEventListener('change', () => {
    const select = document.querySelector('.main__filter').options;
    const sel = document.querySelector('.main__filter').selectedIndex;
    const currentRegion = select[sel].value;
    const cards = document.querySelectorAll(".main__countryCard");
    
    filter(currentRegion,cards)
});

inputSearch.addEventListener('input',()=>{
    let name = getValue('.main__inputSearch');
    ucFirst(name);
    const cards = document.querySelectorAll(".main__countryCard");
    filter(name,cards); 
});

darkModeBtn.addEventListener('click',()=>{
    const lightItems = document.querySelectorAll(".light")
    lightItems.forEach(item => {
        item.className = item.className.replace("light", "dark");
    });
    darkModeBtn.classList.add("hide");
    lightModeBtn.classList.add("show");
    iconSearch.style.fill = "white";
});

lightModeBtn.addEventListener('click',()=>{
    const darkItems = document.querySelectorAll(".dark");
    darkItems.forEach(item => {
        item.className = item.className.replace("dark", "light");
    });
    darkModeBtn.classList.remove("hide");
    lightModeBtn.classList.remove("show");
    iconSearch.style.fill = "black";
});



