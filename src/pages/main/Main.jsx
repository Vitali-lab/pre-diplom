
import styled from 'styled-components'
import { RecentlyViewed } from '../../components/recently-viewed/RecentlyViewed'



const MainContainer = ({className}) => {
  return (
    <div className={className}>
        <h1>Главная</h1>
        <RecentlyViewed/>
    </div>
  )
}

export const Main = styled(MainContainer)`
width: 1600px;
padding: 40px;
border-radius: 10px;



`
