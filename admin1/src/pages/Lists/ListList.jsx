import { useContext, useEffect } from "react";
import { deleteLists, getLists } from "../../context/listContext/apiCalls";
import { ListsContext } from "../../context/listContext/listcontext";
import "./Listlist.css"
import {Link, useHistory }from 'react-router-dom'
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
export default function ListList() {
  const { Lists, dispatch } = useContext(ListsContext);


  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
   
  deleteLists(dispatch,id)
}

console.log(Lists)
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "title", width: 250 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/list/:listId" + params.row._id, list: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid

      
        rows={Lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={r=>r?._id}
     
      />
    </div>
  );
}