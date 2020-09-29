import styled from 'styled-components'
import bg from '../../assets/i-like-food.svg'

export const Wrapper = styled.div`
  height: 100vh;

  background-color: #dfdbe5;
  background-image: url(${bg});
  background-size: auto;
  background-position: center center;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Container = styled.div`
  width: 734px;
  height: 574px;

  background-color: #FFFFFF;

  box-shadow: 0 3px 10px rgba(0,0,0,.15);
  border-radius: 20px;
`