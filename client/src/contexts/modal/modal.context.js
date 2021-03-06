import React, { createContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Modal from '../../components/modal/modal.component';
import useModal from '../../components/modal/use-modal';

const ModalContext = createContext(null);

const ModalProvider = ({ children }) => {
  let { showModal, handleModal, modalContent } = useModal();
  return (
    // similar to Redux <Provider store={store}>
    <ModalContext.Provider value={{ showModal, handleModal, modalContent }}>
      <Router>
        <Modal />
        {children}
      </Router>
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };

/*
Context API　－
    to solve props drilling 
    so that the middle components won't need to help passing props

const NewContext = createContext({         // initial value (obj)
    hidden: true,
    toggleHidden: () => {} 
});
*/
