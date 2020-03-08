import React, {Component} from 'react';
import './App.css';

import {ModuleRegistry, AllModules} from '@ag-grid-enterprise/all-modules';


import { AgGridReact } from 'ag-grid-react';
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-balham.css";

ModuleRegistry.registerModules(AllModules);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Make", field: "make", pivot:true, 
      }, {
        headerName: "Model", field: "model", pivot:true,
      }, {
        headerName: "Price", field: "price", aggFunc: 'sum'
      }],
      rowData: null,
      autoGroupColumnDef: {
        headerName : 'Make',
        field: 'make',
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams : {
          checkbox: true
        }
      }
    }
  }

  componentDidMount() {
    fetch('http://api.myjson.com/bins/15psn9')
      .then(res => res.json())
      .then(rowData => this.setState({rowData}))
      .catch(err => console.log(err));
  }


  onButtonClick = () => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node=>node.data);
    const selectedDataString = selectedData.map(node=>node.make+' '+node.model).join(', ');
    alert(`Selected Nodes: ${selectedDataString}`)
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: 600,
        width: 600 }}
      >
      <button onClick={this.onButtonClick}>Get Selected Rows</button>
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          rowSelection='multiple'
          onGridReady={params => this.gridApi = params.api}
          groupSelectsChildren={true}
          modules={AllModules}
          enableSorting={true}
          enableFilter={true}
          pivotMode={true}
          pivotPanelShow='always' 
           >
        </AgGridReact>
      </div>
    );
  }
}

export default App;
