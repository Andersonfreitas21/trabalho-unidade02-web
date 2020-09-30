import styled from 'styled-components';
import { darken } from 'polished';

export const Button = styled.button`
  margin-top: 15px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  width: 60px;
  height: 36px;
  border: 0;
  border-radius: 4px;
  color: #FFF;
  background: #004D61;
  &:hover {
    background: ${darken(0.04, `#004D61`)};
  }
  span {
    padding-left: 10px;
    font-weight: bold;
  }
`
