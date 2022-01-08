import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AsyncSelect from 'react-select'
import Options from "./ComboboxControlOption";

const styles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'red' : 'black',
        backgroundColor: 'white'
    }),
    control: (styles) => ({ ...styles, backgroundColor: '#fafafa', borderRadius: `12px` }),
    multiValueLabel: (styles) => ({
        ...styles,
        maxHeight: `30px`
    }),
};
function Combobox({ reducerKey, placeholder, labelCustom, sx }) {
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch();

    const reducer = useSelector(state => state[reducerKey]);

    useEffect(() => {
        if(reducer?.body && options?.length === 0) {
            let data = [];
            reducer.body.map((g) =>
                data.push({ 
                    value: g.id, 
                    label: labelCustom 
                        ? <Options sx={sx} label={g.name} image={g[labelCustom]} width="30px"/>
                        : g.name 
                }));
            setOptions(data);
        }
    }, [options, setOptions, reducer, dispatch, reducerKey, labelCustom, sx]);

    return (
        <AsyncSelect
            cacheOptions
            isClearable
            closeMenuOnSelect={true}
            isMulti
            defaultOptions={[options[0]]}
            styles={styles}
            options={options}
            placeholder={<div>{placeholder}</div>} />
    )
}

export default Combobox;