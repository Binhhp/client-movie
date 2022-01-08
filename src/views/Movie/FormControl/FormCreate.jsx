import { 
    Box, 
    FormControl, 
    CardContent, 
    FormHelperText, 
    TextField,
    Grid,
    FormLabel
} from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import ButtonCustom from "ui-component/button/ButtonCustom";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CloseIcon from '@mui/icons-material/Close';
import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "contexts/monitoringContext"
import { Formik } from "formik";
import *  as Yup from "yup";
import Combobox from "./FieldContract/Combobox";
import MainCard from "ui-component/cards/MainCard";
import Breadcrumbs from "ui-component/extended/Breadcrumbs";
import { useDispatch } from "react-redux";
import { Companies } from "store/Company/api";
import { Genres } from "store/Genres/api";
import { Cast } from "store/Cast/api";
import FileUpload from "./FieldContract/FileUpload";
import { Link } from "react-router-dom";

const fields = {
    title: "",
    description: "",
    dateRelease: "",
    sources: ""
}

const validationSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Nhập tiêu đề phim'),
    description: Yup.string().max(255).required('Nhập mô tả phim'),
    sources: Yup.string().max(255).required('Nhập link phim api')
});



function FormCreate() {
    const modal = useContext(ModalContext);
    //Handle close modal
    const handleClose = () => modal.setModal(!modal.openModal);
    const handleSubmitForm = () => {

    }

    const [dateRelease, setDateRelease] = useState(new Date(Date.now()));
    const handleChangeDateRelease = (newDate) => setDateRelease(newDate);

    const dispatch = useDispatch();
    useEffect(() => {
        Promise.all([
            dispatch(Companies.Get()),
            dispatch(Genres.Get()),
            dispatch(Cast.Get()),
        ])
    })

    const [tabPoster, setTabPoster] = useState("2");
    const handleChangeTabPoster = (event, newValue) => setTabPoster(newValue);

    const [tabBackDrop, setTabBackDrop] = useState("2");
    const handleChangeTabBackDrop = (event, newValue) => setTabBackDrop(newValue);

    return (
        <React.Fragment>
            <MainCard title="Tạo mới phim">
                <Breadcrumbs 
                    titleBottom={true}
                    title={true} 
                    rightAlign={true} 
                    icon={true} >    
                </Breadcrumbs>
                <Box component="div">
                    <CardContent>
                        <Box component="div">
                            <Formik
                                initialValues={fields}
                                validationSchema={validationSchema}
                                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                    handleSubmitForm(values)
                                }}>

                                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                    <Grid container >
                                        <form style={{width: `100%`}} noValidate onSubmit={handleSubmit}>
                                            <Box component="div" sx={{position: 'absolute', top: `-52px`, right: `50px`, display: 'flex'}}>
                                                <ButtonCustom
                                                    sx={{marginRight: '10px'}}
                                                    loading={false}
                                                    color="info" 
                                                    title="Lưu lại"
                                                    icon={<SaveAltIcon />}
                                                    variant="contained"
                                                    type="submit" 
                                                ></ButtonCustom>
                                                <ButtonCustom
                                                    component={Link}
                                                    to="/movies"
                                                    handleClick={handleClose}
                                                    loading={false}
                                                    title="Quay lại"
                                                    icon={<CloseIcon />}
                                                    variant="outlined"
                                                ></ButtonCustom>
                                            </Box>
                                            <Box component="div" sx={{display: 'flex', marginBottom: '25px'}}>
                                                <Grid item xs={6} sx={{ marginRight: `10px` }}>
                                                    <FormLabel className="label">Têu đề phim</FormLabel>
                                                    <FormControl sx={{ width: `100%`, marginTop: '10px'}}>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            id="outlined-adornment-title"
                                                            type="text"
                                                            value={values.title}
                                                            name="title"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="Tiêu đề phim"
                                                            inputProps={{}}
                                                        />
                                                        {touched.title && errors.title && (
                                                            <FormHelperText error id={`standard-weight-helper-text-title`}>
                                                                {errors.title}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormLabel className="label">Thể loại</FormLabel>
                                                    <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                        <Combobox reducerKey="genres" placeholder="Thể loại"/>
                                                    </FormControl>
                                                </Grid>
                                            </Box>
                                            <Box component="div" sx={{display: 'flex', marginBottom: '25px'}}>
                                                <Grid item xs={6} sx={{marginRight: '15px'}}>
                                                    <FormLabel className="label">Diễn viên</FormLabel>
                                                    <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                        <Combobox reducerKey="casts" placeholder="Diễn viên" labelCustom="avatar" sx={{borderRadius: '50%'}}/>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormLabel className="label">Công ty</FormLabel>
                                                    <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                        <Combobox reducerKey="companies" placeholder="Công ty" labelCustom="logo"/>
                                                    </FormControl>
                                                </Grid>
                                            </Box>
                                            
                                            <Box component="div" sx={{display: 'flex', marginBottom: '25px'}}>
                                                <Grid item xs={6} sx={{ marginRight: `10px` }}>
                                                    <FormLabel className="label">Link phim API (id,episodeId)</FormLabel>
                                                    <FormControl sx={{ width: `100%`, marginTop: '10px'}}>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            id="outlined-adornment-title"
                                                            type="text"
                                                            value={values.sources}
                                                            name="sources"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="Link phim"
                                                            inputProps={{}}
                                                        />
                                                        {touched.sources && errors.sources && (
                                                            <FormHelperText error id={`standard-weight-helper-text-title`}>
                                                                {errors.sources}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormLabel className="label">Ngày công chiếu</FormLabel>
                                                    <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                            <DesktopDatePicker
                                                                label="Ngày công chiếu"
                                                                value={dateRelease}
                                                                inputFormat="dd/MM/yyyy"
                                                                onChange={handleChangeDateRelease}
                                                                renderInput={(params) => <TextField {...params} />}
                                                            />
                                                        </LocalizationProvider>
                                                    </FormControl>
                                                </Grid>
                                            </Box>
                                            <Box component="div" style={{display: 'flex', flexDirection: 'row', marginBottom: '25px'}}>
                                                <Grid item xs={6} sx={{marginRight: `15px`}}>
                                                    <TabContext value={tabPoster}>
                                                        <FormLabel className="label">
                                                            Poster phim
                                                            <Box component="div">
                                                                <TabList onChange={handleChangeTabPoster} sx={{minHeight: 'auto'}}>
                                                                    <Tab label="file" value="1" sx={{p: 0}}/>
                                                                    <Tab label="link" value="2" sx={{p: 0}}/>
                                                                </TabList>
                                                            </Box>
                                                        </FormLabel>
                                                        <TabPanel value="1" sx={{p: 0}}>
                                                            <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                                <FileUpload name="poster"/>
                                                                {touched.poster && errors.poster && (
                                                                    <FormHelperText error id={`standard-weight-helper-text-poster`}>
                                                                        {errors.poster}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </TabPanel>
                                                        <TabPanel value="2" sx={{p: 0}}>
                                                            <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                                <TextField
                                                                    size="small"
                                                                    fullWidth
                                                                    id="outlined-adornment-poster-link"
                                                                    type="text"
                                                                    value={values.poster}
                                                                    name="poster"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    label="Poster phim"
                                                                    inputProps={{}}
                                                                />
                                                                {touched.poster && errors.poster && (
                                                                    <FormHelperText error id={`standard-weight-helper-text-poster-link`}>
                                                                        {errors.poster}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </TabPanel>
                                                    </TabContext>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TabContext value={tabBackDrop}>
                                                        <FormLabel className="label">
                                                            Ảnh nền phim
                                                            <Box component="div">
                                                                <TabList onChange={handleChangeTabBackDrop} sx={{minHeight: 'auto'}}>
                                                                    <Tab label="file" value="1" sx={{p: 0}}/>
                                                                    <Tab label="link" value="2" sx={{p: 0}}/>
                                                                </TabList>
                                                            </Box>
                                                        </FormLabel>
                                                        <TabPanel value="1" sx={{p: 0}}>
                                                            <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                                <FileUpload name="poster"/>
                                                                {touched.backDrop && errors.backDrop && (
                                                                    <FormHelperText error id={`standard-weight-helper-text-backDrop`}>
                                                                        {errors.backDrop}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </TabPanel>
                                                        <TabPanel value="2" sx={{p: 0}}>
                                                            <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                                <TextField
                                                                    size="small"
                                                                    fullWidth
                                                                    id="outlined-adornment-backDrop-link"
                                                                    type="text"
                                                                    value={values.backDrop}
                                                                    name="backDrop"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    label="Ảnh nền phim"
                                                                    inputProps={{}}
                                                                />
                                                                {touched.backDrop && errors.backDrop && (
                                                                    <FormHelperText error id={`standard-weight-helper-text-backDrop-link`}>
                                                                        {errors.backDrop}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </TabPanel>
                                                    </TabContext>
                                                </Grid>
                                            </Box>
                                            <Grid item xs={12} sx={{marginBottom: `25px`}}>
                                                <FormLabel className="label">Mô tả phim</FormLabel>
                                                <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        id="outlined-adornment-title"
                                                        type="text"
                                                        value={values.title}
                                                        name="title"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Mô tả phim"
                                                        inputProps={{}} />
                                                    {touched.description && errors.description && (
                                                        <FormHelperText error id={`standard-weight-helper-text-title`}>
                                                            {errors.description}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </form>
                                    </Grid>
                                )}
                            </Formik>
                        </Box>
                    </CardContent>
                </Box>
            </MainCard>
        </React.Fragment>
    )
}
export default FormCreate;