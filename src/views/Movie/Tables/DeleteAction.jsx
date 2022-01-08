import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import React from "react";
import ButtonCustom from "ui-component/button/ButtonCustom";

function DeleteAction({ dataIndex }) {
    
    const handleRemove = () => {
        
        Swal.fire({
            title: 'Delete!',
            text: 'Do you want to continue',
            icon: 'question',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            showCancelButton: true
          }).then(async (result) => {
            if(result.isConfirmed) {
                console.log("ok")
            }
        })
        return;
    }

    return(
        <ButtonCustom
            loading={false}
            icon={<DeleteIcon />}
            title="Delete"
            color="error"
            handleClick={handleRemove} />
    )
}

export default DeleteAction;