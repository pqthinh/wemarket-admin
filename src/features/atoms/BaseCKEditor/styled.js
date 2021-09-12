import styled from 'styled-components'
import BaseText from '../BaseText'
export const Wrapper = styled.div`
  margin: 20px 0;

  .ck-content.ck-editor__editable {
    min-height: 400px;
    border: 1.25px solid ${props => props.theme.colors.border};
    max-height: 800px;
    overflow: scroll;
    &::-webkit-scrollbar {
      width: 0;
    }
    scrollbar-width: none;
  }
`
export const Label = styled.div`
  font-weight: 700;
  font-size: 14px;
  margin: 10px 0;
  display: flex;
`
export const TextRequire = styled(BaseText)`
  color: ${props => props.theme.colors.red[0]};
  margin-left: 10px;
`
