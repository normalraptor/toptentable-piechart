import React from 'react';
import Data from "./userModuleLogs.json"
import TopTen from "./components/tabletop";
import PieChart from "./components/piechartmoduleusage";
import { Layout } from 'antd';
import './App.css';

function App() {
  return (
    <div className="App">
      <Layout>
      <PieChart id="pie-chart" userlogs={Data}/>
      <TopTen userlogs={Data} />
      </Layout>
    </div>
  );
}

export default App;
