import ButtonCustom from "ui-component/button/ButtonCustom"
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

function EditAction({ dataIndex }){

    return (
        <ButtonCustom
            loading={false}
            icon={<ModeEditOutlineIcon />}
            title="Edit"
            color="primary" />
    )
}
export default EditAction;