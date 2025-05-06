import { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  align-items: center;
`
// Header component
const Toggle = styled.button`
  background-color: var(--color-grey-100);
  border: none;
  padding: 0.8rem;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-200);
  }
`

export default function Header() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark-mode', !darkMode)
  }
  return (
    <StyledHeader>
      <Button>Log in</Button>
      <Toggle onClick={toggleDarkMode}>{darkMode ? '🌙' : '☀️'}</Toggle>
    </StyledHeader>
  )
}
