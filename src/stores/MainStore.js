import createStore from "unistore";
import axios from "axios";
import Swal from "sweetalert2";

// import Swal from "sweetalert2";
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/storage");

const initialState = {
  username: "",
  password: "",
  confirmNewPassword: "",
  newPassword: "",
  fullName: "",
  email: "",
  personalPhone: "",
  nameBusiness: "",
  nameFile: null,
  image: "",

  isLoadingProduct: true,
  isLoadingInventory: true,
  isLoadingOutlet: true,
  isLoadingCustomer: true,
  isLoadingEmployee: true,
  isLoadingDashboard: true,
  isLoadingReport: true,
  isLoadingProfile: true,

  baseUrl: "https://api.easy.my.id",
  isLogin: false,
  isOwner: false,
  data: undefined,
  error: undefined,
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
  listChart: {},
  listTopProduct: [],
  listTopCategory: [],
  listReminder: [],
  listReportProduct: [],
  listReportHistory: [],
  listReportCategory: [],
  listReportProfit: [],
  listReportOutlet: [],
  listReportInventory: [],

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
  idInventory: "",
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
  idEmployee: "",
  start_time: "",
  end_time: "",
  salesAmount: 0,
  numberTransaction: 0,
  belowReminder: 0,
  totalSalesProduct: 0,
  totalSoldProduct: 0,
  totalSalesCategory: 0,
  totalSoldCategory: 0,
  totalSalesHistory: 0,
  totalSoldHistory: 0,
  totalTaxHistory: 0,
  totalSalesOutlet: 0,
  totalSoldOutlet: 0,
  totalSalesProfit: 0,
  totalCostProfit: 0,
  totalProfit: 0,
  type: "",
  sort: "desc",
  edited: false
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
    store.setState({ isLoadingOutlet: true });
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
          listOutlet: response.data,
          isLoadingOutlet: false
        });
      })
      .catch(error => {});
  },
  postRegister: state => {
    // Set the configuration for your app
    // TODO: Replace with your app's config object
    var firebaseConfig = {
      apiKey: "AIzaSyDUH0ELlUeLq38fCmxltF6ZgqcOh5SznPg",
      authDomain: "serbabuku-e46a3.firebaseapp.com",
      databaseURL: "https://serbabuku-e46a3.firebaseio.com",
      storageBucket: "gs://serbabuku-e46a3.appspot.com"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();

    // Create a storage reference from our storage service
    var storageRef = storage.ref();

    // Create a child reference
    var imagesRef = storageRef.child(`logo/logo-${new Date()}.jpg`);
    // imagesRef now points to 'images'

    imagesRef.put(state.nameFile).then(function(snapshot) {
      imagesRef
        .getDownloadURL()
        .then(function(url) {
          // Insert url into an <img> tag to "download"
          console.warn("--------- INI LINK ----------", url);
          const req = {
            method: "put",
            url: `${state.baseUrl}/user/profile`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            data: {
              fullname: state.fullName,
              phone_number: state.personalPhone,
              business_name: state.nameBusiness,
              image: url
            }
          };
          axios(req)
            .then(response => {
              store.setState({ nameFile: null });
            })
            .catch(error => {});
        })
        .catch(function(error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/object-not-found":
              // File doesn't exist
              break;

            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;
            case "storage/unknown":
              // Unknown error occurred, inspect the server response
              break;
          }
        });
    });
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
        Swal.fire({
          title: "Berhasil Menambahkan Outlet!",
          icon: "success",
          timer: 2000,
        });
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
        Swal.fire({
          title: "Data Berhasil Diperbarui!",
          icon: "success",
          timer: 2000,
        });
      })
      .catch(error => {});
  },
  deleteOutletById: (state, id) => {
    Swal.fire({
      title: 'Yakin ?',
      text: "Kamu tidak dapat mengembalikan data ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.value) {
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
            Swal.fire(
              'Terhapus!',
              'File Anda telah dihapus.',
              'success'
            )
          })
          .catch(error => {});
      }
    })
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
    store.setState({ isLoadingProduct: true });
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
          listProduct: response.data,
          isLoadingProduct: false
        });
        localStorage.setItem("recipe", JSON.stringify([]));
      })
      .catch(error => {});
  },
  addProduct: async state => {
    // Set the configuration for your app
    // TODO: Replace with your app's config object
    var firebaseConfig = {
      apiKey: "AIzaSyDUH0ELlUeLq38fCmxltF6ZgqcOh5SznPg",
      authDomain: "serbabuku-e46a3.firebaseapp.com",
      databaseURL: "https://serbabuku-e46a3.firebaseio.com",
      storageBucket: "gs://serbabuku-e46a3.appspot.com"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();

    // Create a storage reference from our storage service
    var storageRef = storage.ref();

    // Create a child reference
    var imagesRef = storageRef.child(`product/product-${new Date()}.jpg`);
    // imagesRef now points to 'images'

    imagesRef.put(state.nameFile).then(function(snapshot) {
      imagesRef
        .getDownloadURL()
        .then(function(url) {
          // Insert url into an <img> tag to "download"

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
              image: url,
              recipe: state.listRecipe
            }
          };
          axios(req)
            .then(response => {
              store.setState({
                listRecipe: [],
                category: "",
                nameProduct: "",
                show: "",
                nameFile: null
              });
              getProduct(
                state.baseUrl,
                state.category,
                state.nameProduct,
                state.showProduct
              );
              getCategory(state.baseUrl);
              Swal.fire({
                title: "Berhasil Menambahkan Produk!",
                icon: "success",
                timer: 2000,
              });
            })
            .catch(error => {
              store.setState({
                listRecipe: [],
                category: "",
                nameProduct: "",
                show: ""
              });
            });
        })
        .catch(function(error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/object-not-found":
              // File doesn't exist
              break;

            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;
            case "storage/unknown":
              // Unknown error occurred, inspect the server response
              break;
          }
        });
    });
  },
  editProduct: async state => {
    if (state.nameFile === null) {
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
          recipe: JSON.parse(localStorage.getItem("recipe"))
        }
      };
      axios(req)
        .then(response => {
          store.setState({
            listRecipe: [],
            category: "",
            nameProduct: "",
            show: "",
            nameFile: null
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
    } else {
      // Set the configuration for your app
      // TODO: Replace with your app's config object
      var firebaseConfig = {
        apiKey: "AIzaSyDUH0ELlUeLq38fCmxltF6ZgqcOh5SznPg",
        authDomain: "serbabuku-e46a3.firebaseapp.com",
        databaseURL: "https://serbabuku-e46a3.firebaseio.com",
        storageBucket: "gs://serbabuku-e46a3.appspot.com"
      };
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      // Get a reference to the storage service, which is used to create references in your storage bucket
      var storage = firebase.storage();

      // Create a storage reference from our storage service
      var storageRef = storage.ref();

      // Create a child reference
      var imagesRef = storageRef.child(`product/product-${new Date()}.jpg`);
      // imagesRef now points to 'images'

      imagesRef.put(state.nameFile).then(function(snapshot) {
        imagesRef
          .getDownloadURL()
          .then(function(url) {
            // Insert url into an <img> tag to "download"

            const req = {
              method: "put",
              url: `${state.baseUrl}/product/${localStorage.getItem(
                "idProduct"
              )}`,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
              },
              data: {
                name: state.nameProductInput,
                category: state.categoryInput,
                price: state.price * 1,
                show: state.showProductInput,
                image: url,
                recipe: JSON.parse(localStorage.getItem("recipe"))
              }
            };
            axios(req)
              .then(response => {
                store.setState({
                  listRecipe: [],
                  category: "",
                  nameProduct: "",
                  show: "",
                  nameFile: null
                });
                getProduct(
                  state.baseUrl,
                  state.category,
                  state.nameProduct,
                  state.showProduct
                );
                getCategory(state.baseUrl);
                Swal.fire({
                  title: "Data Berhasil Diperbarui!",
                  icon: "success",
                  timer: 2000,
                });
              })
              .catch(error => {
                store.setState({
                  listRecipe: [],
                  category: "",
                  nameProduct: "",
                  show: ""
                });
              });
          })
          .catch(function(error) {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/object-not-found":
                // File doesn't exist
                break;

              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;

              case "storage/canceled":
                // User canceled the upload
                break;
              case "storage/unknown":
                // Unknown error occurred, inspect the server response
                break;
            }
          });
      });
    }
  },

  deleteProduct: state => {
    Swal.fire({
      title: 'Yakin ?',
      text: "Kamu tidak dapat mengembalikan data ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.value) {
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
            Swal.fire(
              'Terhapus!',
              'File Anda telah dihapus.',
              'success'
            )
          })
          .catch(error => {});
        }
      })
  },
  deleteProductById: (state, id) => {
    Swal.fire({
      title: 'Yakin ?',
      text: "Kamu tidak dapat mengembalikan data ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.value) {
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
            Swal.fire(
              'Terhapus!',
              'File Anda telah dihapus.',
              'success'
            )
          })
          .catch(error => {});
        }
      })
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
  deleteRecipe: (state, id) => {
    const ingridient = JSON.parse(localStorage.getItem("recipe"));
    ingridient.splice(id, 1);
    localStorage.setItem("recipe", JSON.stringify(ingridient));
    store.setState({ listRecipe: JSON.parse(localStorage.getItem("recipe")) });
  },
  getInventory: state => {
    store.setState({ isLoadingInventory: true });
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
            listInventory: response.data,
            isLoadingInventory: false
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
            listInventory: response.data.inventories,
            isLoadingInventory: false
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
        Swal.fire({
          title: "Berhasil Menambahkan Bahan Baku!",
          icon: "success",
          timer: 2000,
        });
      })
      .catch(error => {});
  },
  editInventory: async state => {
    const req = {
      method: "put",
      url: `${state.baseUrl}/inventory/detail/${state.idInventory}`,
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
        Swal.fire({
          title: "Data Berhasil Diperbarui!",
          icon: "success",
          timer: 2000,
        });        
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
          idInventory: response.data.id,
          nameInventoryInput: response.data.name,
          stock: response.data.stock,
          unit: response.data.unit,
          reminder: response.data.reminder
        });
      })
      .catch(error => {});
  },
  deleteInventoryById: async (state, id) => {
    Swal.fire({
      title: 'Yakin ?',
      text: "Kamu tidak dapat mengembalikan data ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then( async (result) => {
      if (result.value) {
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
            Swal.fire(
              'Terhapus!',
              'File Anda telah dihapus.',
              'success'
            )
          })
          .catch(error => {});
        }
      })
  },
  addStock: async state => {
    const req = {
      method: "put",
      url: `${state.baseUrl}/inventory/add-stock/${state.idInventory}`,
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
        Swal.fire({
          title: "Berhasil Menambahkan Produk!",
          icon: "success",
          timer: 2000,
        });
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
    store.setState({ isLoadingCustomer: true });

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
          customerNew: response.data.new_customer,
          isLoadingCustomer: false
        });
      })
      .catch(error => {});
  },
  deleteCustomerById: (state, id) => {
    Swal.fire({
      title: 'Yakin ?',
      text: "Kamu tidak dapat mengembalikan data ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.value) {
        store.setState({ isLoadingCustomer: true });

        const req = {
          method: "delete",
          url: `${state.baseUrl}/customer/${id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        };
        axios(req)
          .then(response => {
            Swal.fire(
              'Terhapus!',
              'File Anda telah dihapus.',
              'success'
            )
          })
          .catch(error => {});
        }
      })
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
    store.setState({ isLoadingEmployee: true });

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
          listEmployee: response.data,
          isLoadingEmployee: false
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
        Swal.fire({
          text: "Berhasil Menambahkan Karyawan!",
          icon: "success",
          timer: 2000,
        });
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
    Swal.fire({
      title: 'Yakin ?',
      text: "Kamu tidak dapat mengembalikan data ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.value) {
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
            Swal.fire(
              'Terhapus!',
              'File Anda telah dihapus.',
              'success'
            )
          })
          .catch(error => {});
        }
      })
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
        Swal.fire({
          text: "Data Berhasil Diperbarui!",
          icon: "success",
          timer: 2000,
        });
      })
      .catch(error => {});
  },
  getDashboard: state => {
    store.setState({ isLoadingDashboard: true });
    const req = {
      method: "get",
      url: `${state.baseUrl}/dashboard?name_outlet=${state.outlet}&start_time=${state.start_time}&end_time=${state.end_time}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        store.setState({
          salesAmount: response.data.sales_amount,
          numberTransaction: response.data.number_transaction,
          listChart: response.data.chart,
          listTopProduct: response.data.top_product,
          listTopCategory: response.data.top_category,
          customerNew: response.data.new_customer,
          customerTotal: response.data.total_costumer,
          belowReminder: response.data.below_reminder,
          listReminder: response.data.reminder,
          isLoadingDashboard: false
        });
      })
      .catch(error => {});
  },
  getReportProduct: state => {
    store.setState({ isLoadingReport: true });
    const req = {
      method: "get",
      url: `${state.baseUrl}/report/product-sales?name=${state.nameProduct}&category=${state.category}&id_outlet=${state.idOutlet}&start_time=${state.start_time}&end_time=${state.end_time}&total_sales_sort=${state.sort}&total_sold_sort=`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        store.setState({
          listReportProduct: response.data.detail,
          totalSalesProduct: response.data.total_sales,
          totalSoldProduct: response.data.total_sold,
          isLoadingReport: false
        });
      })
      .catch(error => {});
  },
  getReportCategory: state => {
    store.setState({ isLoadingReport: true });
    const req = {
      method: "get",
      url: `${state.baseUrl}/report/category?start_time=${state.start_time}&end_time=${state.end_time}&total_sales_sort=${state.sort}&total_sold_sort`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        store.setState({
          listReportCategory: response.data.category_list,
          totalSalesCategory: response.data.total_sales,
          totalSoldCategory: response.data.total_items_sold,
          isLoadingReport: false
        });
      })
      .catch(error => {});
  },
  getReportHistory: state => {
    store.setState({ isLoadingReport: true });
    const req = {
      method: "get",
      url: `${state.baseUrl}/report/history?name=${state.nameProduct}&id_outlet=${state.idOutlet}&start_time=${state.start_time}&end_time=${state.end_time}&total_sales_sort&total_sold_sort`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        store.setState({
          listReportHistory: response.data.detail,
          totalSalesHistory: response.data.total_sales,
          totalSoldHistory: response.data.total_items_sold,
          totalTaxHistory: response.data.tax_summary,
          isLoadingReport: false
        });
      })
      .catch(error => {});
  },
  getReportInventory: state => {
    store.setState({ isLoadingReport: true });
    const req = {
      method: "get",
      url: `${state.baseUrl}/report/inventory-log?name=${state.nameInventory}&id_outlet=${state.idOutlet}&type=${state.type}&start_time=${state.start_time}&end_time=${state.end_time}&amount_sort`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        store.setState({
          listReportInventory: response.data,

          isLoadingReport: false
        });
      })
      .catch(error => {});
  },
  getReportProfit: state => {
    store.setState({ isLoadingReport: true });
    const req = {
      method: "get",
      url: `${state.baseUrl}/report/profit?start_time=${state.start_time}&end_time=${state.end_time}&profit_sort=desc`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        store.setState({
          listReportProfit: response.data.result,
          totalSalesProfit: response.data.grand_price_sale,
          totalCostProfit: response.data.grand_price_inventory,
          totalProfit: response.data.grand_price_profit,
          isLoadingReport: false
        });
      })
      .catch(error => {});
  },
  getReportOutlet: state => {
    store.setState({ isLoadingReport: true });
    const req = {
      method: "get",
      url: `${state.baseUrl}/report/outlet-sales?name_outlet=${state.outlet}&start_time=${state.start_time}&end_time=${state.end_time}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        store.setState({
          listReportOutlet: response.data.outlet_list,
          totalSalesOutlet: response.data.total_sales,
          totalSoldOutlet: response.data.total_transaction,
          isLoadingReport: false
        });
      })
      .catch(error => {});
  },
  getProfile: state => {
    store.setState({ isLoadingProfile: true });
    const req = {
      method: "get",
      url: `${state.baseUrl}/user/profile`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    axios(req)
      .then(response => {
        store.setState({
          fullName: response.data.fullname,
          email: response.data.email,
          personalPhone: response.data.phone_number,
          nameBusiness: response.data.business_name,
          image: response.data.image
        });
      })
      .catch(error => {});
  },
  editProfile: state => {
    if (state.nameFile === null) {
      const req = {
        method: "put",
        url: `${state.baseUrl}/user/profile`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data: {
          fullname: state.fullName,
          phone_number: state.personalPhone,
          business_name: state.nameBusiness,
          image: state.image
        }
      };
      axios(req)
        .then(response => {})
        .catch(error => {});
    } else {
      // Set the configuration for your app
      // TODO: Replace with your app's config object
      var firebaseConfig = {
        apiKey: "AIzaSyDUH0ELlUeLq38fCmxltF6ZgqcOh5SznPg",
        authDomain: "serbabuku-e46a3.firebaseapp.com",
        databaseURL: "https://serbabuku-e46a3.firebaseio.com",
        storageBucket: "gs://serbabuku-e46a3.appspot.com"
      };
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      // Get a reference to the storage service, which is used to create references in your storage bucket
      var storage = firebase.storage();

      // Create a storage reference from our storage service
      var storageRef = storage.ref();

      // Create a child reference
      var imagesRef = storageRef.child(`logo/logo-${new Date()}.jpg`);
      // imagesRef now points to 'images'

      imagesRef.put(state.nameFile).then(function(snapshot) {
        imagesRef
          .getDownloadURL()
          .then(function(url) {
            // Insert url into an <img> tag to "download"
            console.warn("--------- INI LINK ----------", url);
            const req = {
              method: "put",
              url: `${state.baseUrl}/user/profile`,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
              },
              data: {
                fullname: state.fullName,
                phone_number: state.personalPhone,
                business_name: state.nameBusiness,
                image: url
              }
            };
            axios(req)
              .then(response => {})
              .catch(error => {});
          })
          .catch(function(error) {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/object-not-found":
                // File doesn't exist
                break;

              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;

              case "storage/canceled":
                // User canceled the upload
                break;
              case "storage/unknown":
                // Unknown error occurred, inspect the server response
                break;
            }
          });
      });
    }
  },
  editPassword: state => {
    const req = {
      method: "put",
      url: `${state.baseUrl}/user/change-password`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data: {
        old_password: state.password,
        new_password: state.newPassword,
        confirm_new_password: state.confirmNewPassword
      }
    };
    axios(req)
      .then(response => {})
      .catch(error => {});
  },

  /**
   * Handling API to post, put, get, and delete action through AXIOS.
   * @param {dict} input the object containing detail of axios input.
   */
  handleApi: async (state, input) => {
    await axios(input)
      .then(async response => {
        if (response.status === 200) {
          await store.setState({ data: response.data });
        } else {
          await store.setState({ error: response });
        }
      })
      .catch(error => {
        console.warn(error);
      });
  },

  /**
   * Checking login status of the user everytime page was mounted
   */
  checkLoginStatus: async state => {
    const input = {
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      url: state.baseUrl + "/login/dashboard"
    };
    await axios(input)
      .then(async response => {
        if (response.data !== "" || response.data !== undefined) {
          if (response.data.hasOwnProperty("claims")) {
            await store.setState({ claims: response.data.claims });
            if (response.data.claims.email) {
              await store.setState({ isOwner: true });
            }
            await store.setState({ isLogin: true });
          } else {
            await store.setState({ isLogin: false });
          }
        }
      })
      .catch(error => {
        console.warn(error);
      });
  },

  /**
   * Handling logout when user click log out butten
   */
  handleLogout: async state => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("cart");
    await store.setState(initialState);
    Swal.fire({
      title: "Good bye!",
      text: "Kamu sudah berhasil keluar!",
      icon: "success",
      timer: 2000,
      confirmButtonText: "understood"
    });
  },

  /**
   * Handle reset data and error in global state everytime page will unmount
   */
  handleReset: async () => {
    await store.setState({ data: undefined, error: undefined });
  },

  handleError: async state => {
    if (state.error !== undefined) {
      await Swal.fire({
        title: "Error!",
        text: state.error.data.message,
        icon: "error",
        timer: 1500,
        confirmButtonText: "Okay!",
        confirmButtonColor: "#b36232"
      });
      await store.setState({ error: undefined });
    }
  },

  handleInput: (state, key, value) => {
    store.setState({ [key]: value });
  }
});

// GET PRODUCT
const getProduct = (baseUrl, category, nameProduct, showProduct) => {
  store.setState({ isLoadingProduct: true });
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
        listProduct: response.data,
        isLoadingProduct: false
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
  store.setState({ isLoadingInventory: true });
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
          listInventory: response.data,
          isLoadingInventory: false
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
          listInventory: response.data.inventories,
          isLoadingInventory: false
        });
      })
      .catch(error => {});
  }
};
const getOutlet = (baseUrl, nameOutlet) => {
  store.setState({ isLoadingOutlet: true });
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
        listOutlet: response.data,
        isLoadingOutlet: false
      });
    })
    .catch(error => {});
};
const getEmployee = (baseUrl, nameEmployee, outlet, position) => {
  store.setState({ isLoadingEmployee: true });

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
        listEmployee: response.data,
        isLoadingEmployee: false
      });
    })
    .catch(error => {});
};
const getCustomer = (baseUrl, nameCustomer) => {
  store.setState({ isLoadingCustomer: true });

  const req = {
    method: "get",
    url: `${baseUrl}/customer?&keyword=${nameCustomer}`,
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
        customerNew: response.data.new_customer,
        isLoadingCustomer: false
      });
    })
    .catch(error => {});
  };
