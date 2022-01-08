import TableActions from "./Tables/Action";
const columnMovie = (dataTable) => {
    return [
        {
            name: "id",
            label: "Id",
            options: {
                filter: true,
                sort: true,
                setCellProps: () => ({ style: {
                    width: `20%`
                }})
            }
        }, 
        {
            name: "poster",
            label: "Ảnh",
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (dataIndex) => {
                    return <img style={{width: `25%`, borderRadius: `10px`}} src={dataTable[dataIndex].backdrop} alt={dataTable[dataIndex].title} />;
                },
                setCellProps: () => ({ style: {
                    width: `30%`
                }})
            }
        }, 
        {
            name: "title",
            label: "Tiêu đề",
            options: {
                filter: true,
                sort: true,
                setCellProps: () => ({ style: {
                    width: `30%`
                }})
            }
        }, 
        {
            name: "action",
            label: "Xử lý",
            options: {
                filter: false,
                sort: false,
                empty: true,
                setCellProps: () => ({ style: {
                    width: `20%`
                }}),
                customBodyRenderLite: (dataIndex, rowIndex) => {
                  return (
                        <TableActions dataIndex={dataIndex} />
                  );
                }
            }
        }
    ];
}

export { columnMovie };