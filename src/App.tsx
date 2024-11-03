// import "./App.css";
// // import { HcirInterface } from "@/components/hcir-interface";
// import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

// function App() {
//   return <DashboardLayout />;
// }

// export default App;

import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/Store";
import MainRouter from "@/routers/MainRouter";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
};

export default App;
