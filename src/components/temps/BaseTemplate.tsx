import React from 'react'
import style from './BaseTemplate.module.scss'
import Header from 'components/orgs/Header/Header'
import Footer from 'components/orgs/Footer'

type Props = {
  children: React.ReactNode
}

export default function BaseTemplate(props: Props) {
  return (
    <React.Fragment>
      <Header />
      <main className={style.main}>{props.children}</main>
      <Footer />
    </React.Fragment>
  )
}
