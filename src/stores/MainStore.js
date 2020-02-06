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
  listInventory: [],
  listRecipe: [],

  nameCustomer: "",
  nameProduct: "",
  category: "",
  showProduct: "",
  idProduct: "",
  imageProduct: "",
  price: "",
  outlet: "",
  nameInventory: "",
  statusInventory: "",
  amount: "",
  unit: ""
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
  getOutlet: state => {
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
  getCategory: state => {
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
  getProduct: state => {
    const req = {
      method: "get",
      url: `${state.baseUrl}/product?category=${state.category}&name=${state.nameProduct}&show=${state.showProduct}`,
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
  },
  addProduct: async state => {
    const req = {
      method: "post",
      url: `${state.baseUrl}/product`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data: {
        name: "dummy",
        category: "",
        price: 0,
        show: "Tidak",
        image: "dummy"
      }
    };
    await axios(req)
      .then(response => {
        store.setState({
          idProduct: response.data.id_product
        });
        localStorage.setItem("idProduct", response.data.id_product);
        console.log("cek id dari add", state.idProduct);
      })
      .catch(error => {});
  },
  editProduct: async state => {
    const req = {
      method: "put",
      url: `${state.baseUrl}/product/${localStorage.getItem("idProduct")}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data: {
        name: state.nameProduct,
        category: state.category,
        price: state.price * 1,
        show: state.showProduct,
        image: state.imageProduct
      }
    };
    await axios(req)
      .then(response => {
        store.setState({
          listRecipe: []
        });
      })
      .catch(error => {});
  },
  deleteProduct: state => {
    const req = {
      method: "delete",
      url: `${state.baseUrl}/product/delete/${state.idProduct}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        getProduct(
          state.baseUrl,
          state.category,
          state.nameProduct,
          state.showProduct
        );
        getCategory(state.baseUrl);
      })
      .catch(error => {});
  },
  deleteProductById: (state, id) => {
    const req = {
      method: "delete",
      url: `${state.baseUrl}/product/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        getProduct(
          state.baseUrl,
          state.category,
          state.nameProduct,
          state.showProduct
        );
      })
      .catch(error => {});
  },
  getProductById: async (state, id) => {
    await localStorage.setItem("idProduct", id);
    const req = {
      method: "get",
      url: `${state.baseUrl}/product/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        store.setState({
          nameProduct: response.data.name,
          category: response.data.category,
          price: response.data.price,
          showProduct: response.data.show,
          imageProduct: response.data.image
        });
        getCategory(state.baseUrl);
      })
      .catch(error => {});
  },
  getRecipe: async state => {
    const req = {
      method: "get",
      url: `${state.baseUrl}/recipe/${localStorage.getItem("idProduct")}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    console.log("produk id", state.idProduct);
    await axios(req)
      .then(response => {
        store.setState({
          listRecipe: response.data
        });
      })
      .catch(error => {});
  },
  addRecipe: async state => {
    const req = {
      method: "post",
      url: `${state.baseUrl}/recipe/${localStorage.getItem("idProduct")}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data: {
        name: state.nameInventory,
        amount: state.amount,
        unit: state.unit
      }
    };
    await axios(req)
      .then(response => {
        store.setState({
          listRecipe: response.data
        });
        getRecipe(state.baseUrl, state.idProduct);
      })
      .catch(error => {});
  },
  getInventory: state => {
    if (state.outlet === "") {
      const req = {
        method: "get",
        url: `${state.baseUrl}/inventory?status=${state.statusInventory}&name=${state.nameInventory}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      };
      axios(req)
        .then(response => {
          store.setState({
            listInventory: response.data
          });
        })
        .catch(error => {});
    } else {
      const req = {
        method: "get",
        url: `${state.baseUrl}/inventory/${state.outlet}?name=${state.nameInventory}&status=${state.statusInventory}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      };
      axios(req)
        .then(response => {
          store.setState({
            listInventory: response.data.inventories
          });
        })
        .catch(error => {});
    }
  },
  handleBack: state => {
    store.setState({
      listRecipe: [],
      category: "",
      nameProduct: "",
      show: ""
    });
  }
});

// GET PRODUCT
const getProduct = (baseUrl, category, nameProduct, showProduct) => {
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
const getCategory = baseUrl => {
  const req = {
    method: "get",
    url: `${baseUrl}/product/category`,
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
};
const getRecipe = (baseUrl, idProduct) => {
  const req = {
    method: "get",
    url: `${baseUrl}/recipe/${idProduct}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };
  axios(req)
    .then(response => {
      store.setState({
        listRecipe: response.data
      });
    })
    .catch(error => {});
};

// const getCustomer = (baseUrl, nameCustomer) => {
//   const req = {
//     method: "get",
//     url: `${baseUrl}/product?category=${category}&name=${nameProduct}&show=${showProduct}`,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`
//     }
//   };
//   axios(req)
//     .then(response => {
//       store.setState({
//         listProduct: response.data
//       });
//     })
// //     .catch(error => {});
// // };
