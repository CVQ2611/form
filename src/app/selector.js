export const userSelector = (state) => state.getDataReducer.listDataUsers;
export const userHomeLoading = (state) => state.getDataReducer.isLoading;
export const userDetailSelector = (state) => state.getDataReducerId.dataUserDetail;
export const userDetailLoading = (state) => state.getDataReducerId.isLoading;
export const autoLoadPage = (state) => state.autoLoading.autoLoad;



