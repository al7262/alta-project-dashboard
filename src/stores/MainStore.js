import createStore from "unistore";
import axios from "axios";
// import Swal from "sweetalert2";

const initialState = {
  username: "",
  password: "",
  baseUrl: "https://api.easy.my.id",
  listOutlet: [],
  listCategory: [],
  listProduct: [],
  nameProduct: "",
  category: "",
  showProduct: ""
};

export const store = createStore(initialState);

export const actions = store => ({
  handleTogglerNavbar: () => {
    const toggler = document.getElementById("navbarToggler");
    const headerLocation = document.getElementById("header-location");
    if (toggler.innerHTML === "menu") {
      toggler.innerHTML = "close";
      headerLocation.style.visibility = "hidden";
    } else {
      toggler.innerHTML = "menu";
      headerLocation.style.visibility = "visible";
    }
  },
  handleVisibilityPassword: () => {
    const password = document.getElementById("password");
    const visibilityPassword = document.getElementById("visibilityPassword");
    if (visibilityPassword.innerHTML === "visibility") {
      password.type = "text";
      visibilityPassword.innerHTML = "visibility_off";
    } else {
      password.type = "password";
      visibilityPassword.innerHTML = "visibility";
    }
  },
  handleVisibilityConfirmPassword: () => {
    const confirmPassword = document.getElementById("confirm-password");
    const visibilityConfirmPassword = document.getElementById(
      "visibilityConfirmPassword"
    );
    if (visibilityConfirmPassword.innerHTML === "visibility") {
      confirmPassword.type = "text";
      visibilityConfirmPassword.innerHTML = "visibility_off";
    } else {
      confirmPassword.type = "password";
      visibilityConfirmPassword.innerHTML = "visibility";
    }
  },
  getOutlet: async state => {
    const req = {
      method: "get",
      url: `${state.baseUrl}/outlet`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        store.setState({
          listOutlet: response.data
        });
      })
      .catch(error => {});
  },
  getCategory: async state => {
    const req = {
      method: "get",
      url: `${state.baseUrl}/product/category`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        store.setState({
          listCategory: response.data
        });
      })
      .catch(error => {});
  },
  handleFilterProduct: async state => {
    getProduct(
      state.baseUrl,
      state.category,
      state.nameProduct,
      state.showProduct
    );
  }
});

// GET PRODUCT
const getProduct = async (baseUrl, category, nameProduct, showProduct) => {
  const req = {
    method: "get",
    url: `${baseUrl}/product?category=${category}&name=${nameProduct}&show=${showProduct}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };
  axios(req)
    .then(response => {
      store.setState({
        listProduct: response.data
      });
    })
    .catch(error => {});
};
