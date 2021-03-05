import React from 'react'
import Header from './../../components/Header'
import Content from './../../components/Content'
import ModalProvider, { useModal } from 'mui-modal-provider';

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
