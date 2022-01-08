import React, { useState } from 'react';

const ModalContext = React.createContext();
function ModalContextProvider({ children }) {
    
    const [openModal, setModal] = useState(false);
    const [propData, setPropData] = useState({});

    return (
        <ModalContext.Provider value={{
            openModal: openModal,
            setModal: setModal,
            propData: propData,
            setPropData: setPropData
        }}>
            {children}
        </ModalContext.Provider>
    )
}
export { 
    ModalContextProvider, 
    ModalContext 
};