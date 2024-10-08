import styled from 'styled-components'

const StyledLogo = styled.div`
  text-align: center;
`

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`

function Logo() {
  return (
    <StyledLogo>
      <Img
        src="/light_logo.png"
        alt="hotel logo showing a capybara in a bathtub"
      />
    </StyledLogo>
  )
}

export default Logo
