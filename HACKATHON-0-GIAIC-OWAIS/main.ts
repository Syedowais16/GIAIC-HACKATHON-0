// Define the Product interface
interface Product {
    name: string;
    quantity: number;
    price: number;
}

// Sample Data
const products: Product[] = [
    { name: "Electronic Products", quantity: 10, price: 10000 },
    { name: "Perfume", quantity: 5, price: 2000 },
    { name: "Motorbike", quantity: 20, price: 150000 }
];

function displayProducts(): void {
    const tableBody = document.getElementById("inventoryTable")?.getElementsByTagName("tbody")[0];
    if (!tableBody) return;

    tableBody.innerHTML = "";

    // Loop through products and add rows to the table
    products.forEach((product: Product) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
        `;

        tableBody.appendChild(row);
    });
}

function addProduct(): void {
    const name = (document.getElementById("productName") as HTMLInputElement).value;
    const quantity = parseInt((document.getElementById("productQuantity") as HTMLInputElement).value);
    const price = parseFloat((document.getElementById("productPrice") as HTMLInputElement).value);

    if (name && quantity > 0 && price > 0) {
        // validations
        const isDuplicate = products.some((product) => product.name === name && product.quantity === quantity && product.price === price);

        if (!isDuplicate) {
            const newProduct: Product = { name, quantity, price };
            products.push(newProduct);
            displayProducts();
        } else {
            alert("A product with the same name, quantity, and price already exists.");
        }
    } else {
        alert("Please enter valid product details.");
    }
}

displayProducts();
