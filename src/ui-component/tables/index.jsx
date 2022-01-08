
import MUIDataTable from "mui-datatables";
import React, { useContext } from "react";
import { options } from "./config";
import { TableContext } from "contexts/customTableOptionsContext";
import { themeTable } from "./theme";
import { ThemeProvider } from "@mui/styles";

function Tables({ title, columns, dataTable, handleRemoveSelected, optionParams }) {
    const customTableOptions = useContext(TableContext);
    return (
        <ThemeProvider theme={themeTable}>
            <MUIDataTable
                className="mui-datatables"
                title={title}
                data={dataTable}
                columns={columns}
                options={options(customTableOptions, handleRemoveSelected, optionParams)}
            />
        </ThemeProvider>
    )
}

export default Tables;