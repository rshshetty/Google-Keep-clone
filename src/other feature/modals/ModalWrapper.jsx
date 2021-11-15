import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'semantic-ui-react';

import { closeModal } from './modalReducer';


export default function ModalWrapper({ children, size, header }) {
    
    const dispatch = useDispatch();
    const { mode } = useSelector(state => state.event)
    let Styles = {
    backgroundColor:( mode==='dark'&&'#808080'), 
    color: (mode=== 'dark' && '#FFFFFF' )

    }


    
    
    let StylesBody = {
           backgroundColor:( mode==='dark'&&'#292929'), 
    color: (mode=== 'dark' && '#FFFFFF' )
        
    }


    return (
        <Modal open={true} onClose={() => dispatch(closeModal())} size={size} >
            {header && <Modal.Header style={Styles}>{header}</Modal.Header>}
            <Modal.Content
                style={StylesBody}
            >
                {children}
            </Modal.Content>
        </Modal>
    )
}