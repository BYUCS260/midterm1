/*global axios */
/*global Vue */
var app = new Vue({
    el: '#shopping',
    data: {
        name: "",
        price: "",
        url: "",
        products: [],
        cart: [],
    },
    created() {
        this.getProducts();
    },
    methods: {
        async getProducts() {
            try {
                let response = await axios.get("/products");
                this.products = response.data;
                return true;
            }
            catch (error) {
                console.log(error);
            }
        },
        async addProduct() {
            try {
                await axios.post("/products", {
                    name: this.name,
                    price: this.price,
                    url: this.url,
                    orders: 0,
                });
            }
            catch (error) {
                console.log(error);
            }
            this.getProducts();
            this.name = "";
            this.price = "";
            this.url = "";
        },
        async incrementOrders(product) {
            try {
                await axios.put("/products/increment/" + product._id);
            }
            catch (error) {
                console.log(error);
            }
        },
        purchase() {
            for (let product of this.products) {
                if (product.selected) {
                    if (!this.cart.includes(product)) {
                        this.incrementOrders(product);
                        this.cart.push(product);
                    }
                }
            }
        },
        async deleteProduct(product) {
            try {
                axios.delete("/products/" + product._id);
                this.getProducts();
            }
            catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        sortedProducts() {
            if (this.products.length == 0) {
                return [];
            }
            return this.products.sort((a, b) => {
                var rval = 0;
                if (a.name > b.name) {
                    rval = 1;
                }
                else if (a.name < b.name) {
                    rval = -1;
                }
                return (rval);
            });
        },
        sortedCart() {
            if (this.cart.length == 0) {
                return [];
            }
            return this.cart.sort((a, b) => {
                var rval = 0;
                if (a.name > b.name) {
                    rval = 1;
                }
                else if (a.name < b.name) {
                    rval = -1;
                }
                return (rval);
            });
        }
    }
});
