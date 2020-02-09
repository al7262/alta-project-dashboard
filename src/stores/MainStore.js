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
  listCustomer: [],
  listProvince: [],
  listCity: [],
  listDistrict: [],
  listEmployee: [],

  nameEmployee: "",
  nameCustomer: "",
  customerTotal: "",
  customerLoyal: "",
  customerNew: "",
  nameProduct: "",
  nameProductInput: "",
  nameOutlet: "",
  nameOutletInput: "",
  phoneNumber: "",
  tax: "",
  address: "",
  category: "",
  categoryInput: "",
  showProduct: "",
  showProductInput: "",
  idProduct: "",
  imageProduct: "",
  price: "",
  outlet: "",
  nameInventory: "",
  nameInventoryInput: "",
  statusInventory: "",
  stock: "",
  unit_price: "",
  reminder: "",
  quantity: "",
  unit: "",
  inputProvince: "",
  idOutlet: "",
  province: "",
  idProvince: "",
  inputCity: "",
  city: "",
  idCity: "",
  district: "",
  position: "",
  positionInput: "",
  idEmployee: ""
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
      url: `${state.baseUrl}/outlet?keyword=${state.nameOutlet}`,
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
  addOutlet: state => {
    const req = {
      method: "post",
      url: `${state.baseUrl}/outlet/create`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data: {
        name: state.nameOutletInput,
        phone_number: state.phoneNumber,
        tax: state.tax,
        address: state.address,
        city: state.city,
        province: state.province,
        district: state.district
      }
    };
    axios(req)
      .then(response => {
        getOutlet(state.baseUrl, state.nameOutlet);
      })
      .catch(error => {});
  },
  editOutlet: state => {
    const req = {
      method: "put",
      url: `${state.baseUrl}/outlet/${state.idOutlet}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data: {
        name: state.nameOutletInput,
        phone_number: state.phoneNumber,
        tax: state.tax,
        address: state.address,
        city: state.city,
        province: state.province,
        district: state.district
      }
    };

    axios(req)
      .then(response => {
        getOutlet(state.baseUrl, state.nameOutlet);
      })
      .catch(error => {});
  },
  deleteOutletById: (state, id) => {
    const req = {
      method: "delete",
      url: `${state.baseUrl}/outlet/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };

    axios(req)
      .then(response => {
        getOutlet(state.baseUrl, state.nameOutlet);
      })
      .catch(error => {});
  },
  getOutletById: (state, id) => {
    const req = {
      method: "get",
      url: `${state.baseUrl}/outlet/get/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        store.setState({
          nameOutletInput: response.data.name,
          phoneNumber: response.data.phone_number,
          city: response.data.city,
          tax: response.data.tax,
          address: response.data.address,
          idOutlet: response.data.id,
          district: response.data.district,
          province: response.data.province
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
        localStorage.setItem("recipe", JSON.stringify([]));
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
        name: state.nameProductInput,
        category: state.categoryInput,
        price: state.price * 1,
        show: state.showProductInput,
        image: state.imageProduct,
        recipe: state.listRecipe
      }
    };
    console.log("cek input", req.data);
    await axios(req)
      .then(response => {
        store.setState({
          listRecipe: [],
          category: "",
          nameProduct: "",
          show: ""
        });
        getProduct(
          state.baseUrl,
          state.category,
          state.nameProduct,
          state.showProduct
        );
        getCategory(state.baseUrl);
      })
      .catch(error => {
        store.setState({
          listRecipe: [],
          category: "",
          nameProduct: "",
          show: ""
        });
      });
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
        name: state.nameProductInput,
        category: state.categoryInput,
        price: state.price * 1,
        show: state.showProductInput,
        image: state.imageProduct,
        recipe: state.listRecipe
      }
    };
    await axios(req)
      .then(response => {
        store.setState({
          listRecipe: [],
          category: "",
          nameProduct: "",
          show: ""
        });
        getProduct(
          state.baseUrl,
          state.category,
          state.nameProduct,
          state.showProduct
        );
        getCategory(state.baseUrl);
      })
      .catch(error => {
        store.setState({
          listRecipe: [],
          category: "",
          nameProduct: "",
          show: ""
        });
      });
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
          nameProductInput: response.data.name,
          categoryInput: response.data.category,
          price: response.data.price,
          showProductInput: response.data.show,
          imageProduct: response.data.image
        });
        localStorage.setItem("recipe", JSON.stringify(response.data.recipe));
        getCategory(state.baseUrl);
      })
      .catch(error => {});
  },

  addRecipe: state => {
    const ingridient = JSON.parse(localStorage.getItem("recipe"));
    ingridient.push({
      name: state.nameInventory,
      quantity: state.quantity,
      unit: state.unit
    });
    localStorage.setItem("recipe", JSON.stringify(ingridient));
    store.setState({ listRecipe: JSON.parse(localStorage.getItem("recipe")) });
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
  addInventory: async state => {
    const req = {
      method: "post",
      url: `${state.baseUrl}/inventory/${state.outlet}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data: {
        name: state.nameInventoryInput,
        stock: state.stock,
        unit: state.unit,
        unit_price: state.unit_price,
        reminder: state.reminder
      }
    };
    console.log("cek input", req.data);
    await axios(req)
      .then(response => {
        getInventory(
          state.baseUrl,
          state.outlet,
          state.nameInventory,
          state.statusInventory
        );
      })
      .catch(error => {});
  },
  editInventory: async (state, id) => {
    const req = {
      method: "put",
      url: `${state.baseUrl}/inventory/detail/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data: {
        name: state.nameInventoryInput,
        stock: state.stock,
        unit: state.unit,
        unit_price: state.unit_price,
        reminder: state.reminder
      }
    };
    await axios(req)
      .then(response => {
        getInventory(
          state.baseUrl,
          state.outlet,
          state.nameInventory,
          state.statusInventory
        );
      })
      .catch(error => {});
  },
  getInventoryById: async (state, id) => {
    const req = {
      method: "get",
      url: `${state.baseUrl}/inventory/detail/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    await axios(req)
      .then(response => {
        store.setState({
          nameInventoryInput: response.data.name,
          stock: response.data.stock,
          unit: response.data.unit,
          reminder: response.data.reminder
        });
      })
      .catch(error => {});
  },
  deleteInventoryById: async (state, id) => {
    const req = {
      method: "delete",
      url: `${state.baseUrl}/inventory/detail/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    await axios(req)
      .then(response => {
        getInventory(
          state.baseUrl,
          state.outlet,
          state.nameInventory,
          state.statusInventory
        );
      })
      .catch(error => {});
  },
  addStock: async (state, id) => {
    const req = {
      method: "put",
      url: `${state.baseUrl}/inventory/add-stock/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data: {
        stock: state.stock,
        price: state.unit_price
      }
    };
    await axios(req)
      .then(response => {
        getInventory(
          state.baseUrl,
          state.outlet,
          state.nameInventory,
          state.statusInventory
        );
      })
      .catch(error => {});
  },
  handleBack: state => {
    store.setState({
      listRecipe: [],
      categoryInput: "",
      nameProductInput: "",
      showProductInput: "",
      price: 0,
      imageProduct: ""
    });
  },
  getCustomer: state => {
    const req = {
      method: "get",
      url: `${state.baseUrl}/customer?&keyword=${state.nameCustomer}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        store.setState({
          listCustomer: response.data.list_all_customer,
          customerTotal: response.data.total_costumer,
          customerLoyal: response.data.costumer_loyal.fullname,
          customerNew: response.data.new_customer
        });
      })
      .catch(error => {});
  },
  getProvince: state => {
    const req = {
      method: "get",
      url: `https://dev.farizdotid.com/api/daerahindonesia/provinsi`
    };
    axios(req)
      .then(response => {
        store.setState({
          listProvince: response.data.semuaprovinsi
        });
      })
      .catch(error => {});
  },
  getCity: state => {
    [state.idProvince, state.province] = state.inputProvince.split(",");
    const req = {
      method: "get",
      url: `http://dev.farizdotid.com/api/daerahindonesia/provinsi/${state.idProvince}/kabupaten`
    };
    axios(req)
      .then(response => {
        store.setState({
          listCity: response.data.kabupatens
        });
      })
      .catch(error => {});
  },
  getDistrict: state => {
    [state.idCity, state.city] = state.inputCity.split(",");
    const req = {
      method: "get",
      url: ` http://dev.farizdotid.com/api/daerahindonesia/provinsi/kabupaten/${state.idCity}/kecamatan`
    };
    axios(req)
      .then(response => {
        store.setState({
          listDistrict: response.data.kecamatans
        });
      })
      .catch(error => {});
  },
  getEmployee: state => {
    const req = {
      method: "get",
      url: `${state.baseUrl}/employee?&keyword=${state.nameEmployee}&name_outlet=${state.outlet}&position=${state.position}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        store.setState({
          listEmployee: response.data
        });
      })
      .catch(error => {});
  },
  addEmployee: state => {
    const req = {
      method: "post",
      url: `${state.baseUrl}/employee/create`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data: {
        id_outlet: state.idOutlet,
        full_name: state.nameEmployeeInput,
        username: state.username,
        password: state.password,
        position: state.positionInput
      }
    };
    axios(req)
      .then(response => {
        getEmployee(
          state.baseUrl,
          state.nameEmployee,
          state.outlet,
          state.position
        );
      })
      .catch(error => {});
  },
  getEmployeeById: (state, id) => {
    const req = {
      method: "get",
      url: `${state.baseUrl}/employee/get/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        store.setState({
          username: response.data.username,
          nameEmployeeInput: response.data.full_name,
          positionInput: response.data.position,
          idOutlet: response.data.id_outlet,
          outletName: response.data.outlet_name,
          idEmployee: response.data.id
        });
      })
      .catch(error => {});
  },
  deleteEmployeeById: (state, id) => {
    const req = {
      method: "delete",
      url: `${state.baseUrl}/employee/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        getEmployee(
          state.baseUrl,
          state.nameEmployee,
          state.outlet,
          state.position
        );
      })
      .catch(error => {});
  },
  editEmployee: state => {
    const req = {
      method: "put",
      url: `${state.baseUrl}/employee/${state.idEmployee}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data: {
        id_outlet: state.idOutlet,
        fullname: state.nameEmployeeInput,
        username: state.username,
        password: state.password,
        position: state.positionInput
      }
    };
    axios(req)
      .then(response => {
        getEmployee(
          state.baseUrl,
          state.nameEmployee,
          state.outlet,
          state.position
        );
      })
      .catch(error => {});
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
const getInventory = (baseUrl, outlet, statusInventory, nameInventory) => {
  if (outlet === "") {
    const req = {
      method: "get",
      url: `${baseUrl}/inventory?status=${statusInventory}&name=${nameInventory}`,
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
      url: `${baseUrl}/inventory/${outlet}?name=${nameInventory}&status=${statusInventory}`,
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
};
const getOutlet = (baseUrl, nameOutlet) => {
  const req = {
    method: "get",
    url: `${baseUrl}/outlet?keyword=${nameOutlet}`,
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
};
const getEmployee = (baseUrl, nameEmployee, outlet, position) => {
  const req = {
    method: "get",
    url: `${baseUrl}/employee?&keyword=${nameEmployee}&name_outlet=${outlet}&position=${position}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };
  axios(req)
    .then(response => {
      store.setState({
        listEmployee: response.data
      });
    })
    .catch(error => {});
};
