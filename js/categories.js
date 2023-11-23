// Definición de constantes para criterios de ordenamiento, variable para almacenar el criterio de ordenamiento actual y Variables para filtros de cantidad
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

// Función para ordenar un arreglo de categorías, que retorna en un resultado según la condición
function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    // Ordenar de forma ascendente por nombre
    {
        result = array.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        // Ordenar de forma descendente por nombre
        result = array.sort(function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        // Ordenar por cantidad de productos (números)
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
};

// Función para establecer la categoría seleccionada y redirigir a otra página (Información de Producto)
function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
};

// Función para mostrar la lista de categorías en la página
function showCategoriesList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let category = currentCategoriesArray[i];

        // Filtrar categorías según cantidad mínima y máxima
        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))) {

            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                            <small class="text-muted">${category.productCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `
        }
        // Actualizar el contenido HTML con las categorías
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
};

// Función para ordenar y mostrar las categorías
function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CATEGORIES_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCategoriesArray = resultObj.data
            showCategoriesList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    // Event listeners para botones de ordenamiento
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    // Event listener para borrar filtros de cantidad
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    // Event listener para aplicar filtros de cantidad
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showCategoriesList();
    });

    // Obtener el correo electrónico del almacenamiento local y mostrarlo
    let mmail = localStorage.getItem('mail');
    let spanM = document.getElementById('mailNB');
    if (mmail != null) {
        spanM.innerHTML = `${mmail}`;
    }
});


const modoOscuroToggle = document.getElementById('modoOscuroToggle');

const body = document.body

// Agregar un evento de clic al interruptor del modo oscuro
const cambiarModo = () => {
    body.classList.toggle('modo-oscuro');

    if (body.classList.contains('modo-oscuro')) {
        localStorage.setItem('modo-oscuro', 'true');//Guardado en LocalStorage
    } else {
        localStorage.setItem('modo-oscuro', 'false');//Guardado en LocalStorage
    }
};
modoOscuroToggle.addEventListener('click', cambiarModo);



const modoOscuroGuardado = localStorage.getItem('modo-oscuro');
if (modoOscuroGuardado === 'true') {
    body.classList.add('modo-oscuro');
    main[0].classList.remove('bg-light')

} else {
    body.classList.remove('modo-oscuro');
}
