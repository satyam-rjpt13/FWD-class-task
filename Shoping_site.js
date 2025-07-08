let container = document.querySelector(".container");
let loadMoreBtn = document.getElementById("loadMore");
let searchInput = document.getElementById("searchInput");
let categorySelect = document.getElementById("categorySelect");

let allProducts = [];
let filteredProducts = [];
let currentIndex = 0;
const PRODUCTS_PER_LOAD = 5;

// Render limited products
const renderProducts = () => {
  container.innerHTML = "";
  const sliced = filteredProducts.slice(0, currentIndex);
  sliced.forEach((ele) => {
    const { title, description, image, price } = ele;
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${image}" alt="${title}" />
      <h2>${title}</h2>
      <i>${description}</i>
      <strong>₹${price}</strong>
      <button>Add to Cart</button>
    `;
    container.appendChild(div);
  });
};

// Filter based on category and search
const filterProducts = () => {
  const term = searchInput.value.toLowerCase();
  const category = categorySelect.value;

  filteredProducts = allProducts.filter((product) => {
    const titleMatch = product.title.toLowerCase().startsWith(term); // or use includes()
    const categoryMatch = category === "all" || product.category === category;
    return titleMatch && categoryMatch;
  });

  currentIndex = PRODUCTS_PER_LOAD;
  renderProducts();
};

// Load more button
loadMoreBtn.addEventListener("click", () => {
  currentIndex += PRODUCTS_PER_LOAD;
  renderProducts();
});

// Search & category change listeners
searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);

// Fetch data on page load
const fetchData = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      filteredProducts = [...allProducts];
      currentIndex = PRODUCTS_PER_LOAD;
      renderProducts();
    });

  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((categories) => {
      categories.forEach((cat) => {
        let opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        categorySelect.appendChild(opt);
      });
    });
};

fetchData(); // auto-run on page load