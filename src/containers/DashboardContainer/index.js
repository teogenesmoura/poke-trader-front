import React from 'react'
import Header from './../../components/Header'
import ModalProvider from 'mui-modal-provider';

export default function Dashboard(props) {
  return (
    <>
      <Header/>
      <ModalProvider>
        {props.children}
      </ModalProvider>
    </>
  )
}
