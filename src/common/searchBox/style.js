import styled from 'styled-components';

export const ColumnSearchPanel = styled.div`
&.hidden {
  position: relative;
  z-index: 1003;
}
&.show {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100px;
background: #fff;
z-index: 1004;
box-shadow: 0 2px 8px 0 rgba(0,0,0,.21);
}
`