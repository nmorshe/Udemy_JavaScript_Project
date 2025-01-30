// loadStore
// productHelpText
// itemSelection

let apiKey;
let numItemsOnShelf;
let isUpdating = false;
let updatingObj;

// Pre-built Instructor methods

/**
 * Populates shelf with entered shelf elements based on API database.
 * 
 * Helper methods:
 * getParentElement(),
 * getProductElement(),
 * getUpdateBtn(),
 * getDeleteBtn()
 * 
 * @param {any} products: Array of items in database.
 */
const populateShelf = products => {
    getByID("pricedItems").innerHTML = "";
    products.forEach(data => {
        const div = getParentElement();
        const productDiv = getProductElement(data);
        const update = getUpdateBtn(data);
        const deleteBtn = getDeleteBtn(data);

        div.appendChild(productDiv);
        div.appendChild(update);
        div.appendChild(deleteBtn);

        getByID("pricedItems").appendChild(div);
    });
}

const getParentElement = () => {
    const div = document.createElement("div");
    div.classList.add("quarterWidth", "flexCol");
    return div;
}

const getProductElement = data => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("flex", "fullSize");
    const price = document.createElement("span");
    price.classList.add("redText", "priceText");
    price.innerText = `$${parseFloat(data.cost).toFixed(2)}`;
    const product = document.createElement("div");
    product.classList.add("shelfedProduct");
    product.style.backgroundImage = `url(${data.image})`;
    productDiv.appendChild(price);
    productDiv.appendChild(product);
    return productDiv;
}

const getUpdateBtn = product => {
    const update = document.createElement("div");
    update.classList.add("btn");
    update.setAttribute("data-price", product.cost);
    update.innerText = "Update";
    update.onclick = () => updateProduct(product);
    return update;
}

const getDeleteBtn = product => {
    const deleteBtn = document.createElement("div");
    deleteBtn.classList.add("btn");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => deleteItem(product._id);
    return deleteBtn;
}


// Actual Work


const updateProduct = (product) => {

    showPriceContainer(product.image);

    isUpdating = true;
    updatingObj = product;
}

const deleteItem = (id) => {

    const toDel = {
        method: "DELETE"
    }

    fetch(getUrl(id), toDel).then(d => {
        loadStore();
    }).catch(err => console.log(err));
}

const getUrl = (id = "") => {
    return `https://crudcrud.com/api/${apiKey}/store/${id}`;
}

const setHelpText = (text) => {
    getByID("productHelpText").innerText = text;
}

const addProductToShelf = (product) => {
    const data = {
        method: "POST",

        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },

        body: JSON.stringify(product)
    }

    fetch(getUrl(), data).then(d => {
        d.json().then(item => {
            loadStore();
        }).catch(err => console.log(err));

    }).catch(err => console.log(err));
}

const updateProductOnShelf = (product, val) => {

    const bodyData = { ...product, cost: val };
    delete bodyData._id;

    const data = {
        method: "PUT",

        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },

        body: JSON.stringify(bodyData)
    }

    fetch(getUrl(updatingObj._id), data).then(d => {
        isUpdating = false;
        loadStore();
    }).catch(err => console.log(err));
}

const onAdd = () => {
    // selectedPrice
    // selectedProduct

    const val = getByID("selectedPrice").value;
    const bg = getByID("selectedProduct").style.backgroundImage;

    const bgVal = bg.split('"')[1];

    const toAdd = { cost: val, image: bgVal };

    if (!isUpdating) {
        addProductToShelf(toAdd);
    }

    else {
        updateProductOnShelf(updatingObj, val);
    }

    getByID("selectedPrice").value = "";
}

const showPriceContainer = (item) => {
    hideElemByID("itemSelection");
    setHelpText("Set Price of Product");
    showElemByID("setPriceContainer");

    if (item.indexOf("assets") === -1) {
        getByID("selectedProduct").style.backgroundImage = `url(./assets/${item}.png)`;
    }

    else {
        getByID("selectedProduct").style.backgroundImage = `url(${item})`;
    }
}

const choiceProduct = (item) => {

    if (numItemsOnShelf == 4) {
        return setHelpText("Shelf is full");
    }

    showPriceContainer(item);

    
}

const fetchItems = () => {
    fetch(getUrl()).then(data => {
        data.json().then(items => {
            numItemsOnShelf = items.length;
            populateShelf(items);
            hideElemByID("setPriceContainer");
            hideElemByID("loadStore");
            showElemByID("itemSelection");
            setHelpText("Select a product");

        }).catch(err => console.log(err));
    }
    ).catch(err => console.log(err));
}


const loadStore = () => {
    apiKey = getByID("crudKey").value;

    if (apiKey.length) {
        fetchItems();
    }
}