const AxiosInstancePaths = {
  login_path: "/authentication/login",
  refresh_token_url: "auth/refresh_token",
  base_url: "https://sharanamagritech.com/api/",
  Auth: {
    LOGIN: "auth/login",
    SIGN_UP: "auth/register",
    FORGOT_PASSWORD: "auth/change_password",
    SEND_VERIFICATION_CODE: "auth/send_verification_code",
    RESEND_VERIFICATION_CODE: "auth/resend_verification_code",
    VERIFY_VERIFICATION_CODE: "auth/verify_verification_code",
    CHANGE_PASSWORD: "auth/change_password",
  },
  Dashboard: {
    GET_DATA: "dashboard",
  },
  Roles: {
    GET_LIST: "roles",
    ADD: "roles/",
    GET_BY_ID: "roles/",
    UPDATE_BY_ID: "roles/",
    DELETE_BY_ID: "roles/",
  },
  Modules: {
    GET_LIST: "modules",
    ADD: "modules/",
    GET_BY_ID: "modules/",
    UPDATE_BY_ID: "modules/",
    DELETE_BY_ID: "modules/",
  },
  Permissions: {
    GET_LIST: "permissions",
    ADD: "permissions/",
    GET_BY_ID: "permissions/",
    UPDATE_BY_ID: "permissions/",
    DELETE_BY_ID: "permissions/",
  },
  Languages: {
    GET_LIST: "languages",
    ADD: "languages/",
    GET_BY_ID: "languages/",
    UPDATE_BY_ID: "languages/",
    DELETE_BY_ID: "languages/",
  },
  Brands: {
    GET_LIST: "brands",
    ADD: "brands/",
    GET_BY_ID: "brands/",
    UPDATE_BY_ID: "brands/",
    DELETE_BY_ID: "brands/",
    DOWNLOAD_EXCEL: "brands/download-excel",
  },
  Categories: {
    GET_LIST: "categories",
    ADD: "/categories/",
    GET_BY_ID: "/categories/",
    UPDATE_BY_ID: "/categories/",
    DELETE_BY_ID: "/categories/",
    DOWNLOAD_EXCEL: "/categories/download-excel",
  },
  Offers: {
    GET_LIST: "offers",
    ADD: "offers/",
    GET_BY_ID: "offers/",
    UPDATE_BY_ID: "offers/",
    DELETE_BY_ID: "offers/",
    DOWNLOAD_EXCEL: "offers/download-excel",
  },
  Orders: {
    GET_LIST: "orders",
    ADD: "orders/",
    ADD_RETURN: "orders/return/",
    GET_BY_ID: "orders/",
    UPDATE_BY_ID: "orders/",
    DELETE_BY_ID: "orders/",
    DOWNLOAD_EXCEL: "orders/download-excel",
  },
  Bills: {
    GET_LIST: "bills",
    GET_BY_ID: "bills/",
    UPDATE_BY_ID: "bills/",
    DOWNLOAD_EXCEL: "bills/download-excel",
    DOWNLOAD_BILL: "bills/download-bill/",
  },
  Ledgers: {
    GET_LIST: "ledgers",
    GET_BY_ID: "ledgers/",
    DOWNLOAD_EXCEL: "/ledgers/download-excel",
  },
  Products: {
    GET_LIST: "products",
    ADD: "products/",
    GET_BY_ID: "products/",
    UPDATE_BY_ID: "products/",
    DELETE_BY_ID: "products/",
    DOWNLOAD_EXCEL: "products/download-excel",
  },
  Users: {
    GET_LIST: "users",
    ADD: "users/",
    GET_BY_ID: "users/",
    UPDATE_BY_ID: "users/",
    ADD_MONEY: "money/",
    DELETE_MONEY: "money/",
    DELETE_BY_ID: "users/",
    GET_ACCOUNT: "users/get_account_details",
    DOWNLOAD_EXCEL: "users/download-excel",
  },
  Documents: {
    Delete: {
      PRODUCTS_IMAGE: "documents/products/",
    },
  },
};

export default AxiosInstancePaths;
