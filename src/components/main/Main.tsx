import astronautConnected from '../../img/astronaut-connected.svg'
import astronautDisconnected from '../../img/astronaut-disconnected.svg'

import styles from './Main.module.scss'

export interface HeaderProps {
  userIsConnected?: boolean
}

type Comp = (props: HeaderProps) => JSX.Element

const Header: Comp = (props) => {
  const { userIsConnected = false } = props

  return (
    <main className={styles['main']}>
      <img
        className={styles['astronaut']}
        src={userIsConnected ? astronautConnected : astronautDisconnected}
        alt="astronaut"
      />
    </main>
  )
}

export default Header
