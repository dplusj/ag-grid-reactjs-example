import React, {Component} from 'react';
import './App.css';

import 'ag-grid-enterprise';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Make", field: "make", sortable: true, filter: true, checkboxSelection: true, rowGroup: true
      }, {
        headerName: "Model", field: "model", sortable: true, filter: true
      }, {
        headerName: "Price", field: "price", sortable: true, filter: true
      }],
      rowData: null,
      autoGroupColumnDef: {
        headerName : 'Model',
        field: 'model',
        cellRender: 'agGroupCellRenderer',
        cellRenderParams : {
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
          autoGroupColumnDef={this.state.autoGroupColumnDef}
          rowData={this.state.rowData}
          rowSelection='multiple'
          onGridReady={params => this.gridApi = params.api}
          groupSelectsChildren={true} >
        </AgGridReact>
      </div>
    );
  }
}

export default App;
