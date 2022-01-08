
function FileUpload({ name }) {
    return (
        <input 
            accept="image/*" 
            className="file-upload"
            multiple 
            type="file" 
            name={name}
        /> 
    )
}

export default FileUpload;