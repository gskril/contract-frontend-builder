import styled, { css } from 'styled-components'

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;

  /* temporary styles for dev */
  padding: 1rem;
  background-color: #fafcff;
  border: 1px solid #cbcbcb;
  box-shadow: 1px 4px 26px rgba(78, 162, 240, 0.25);
  border-radius: 8px;
`

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.75rem 1rem 0.65625rem;
  border: 0.09375rem solid rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  box-shadow: rgb(66 124 211 / 10%) 1px 1px 6px;
`

export const Label = styled.label`
  font-size: 0.9375rem;
  font-weight: 400;
  color: rgb(155, 155, 167);
  text-align: left;
`

export const StyledInput = styled.input`
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 1;
  width: 100%;
  border: none;
  padding-bottom: 0.125rem;
  border-bottom: 0.09375rem solid transparent;
  transition: border-bottom 0.1s ease-in-out;
  background-color: inherit;

  &::placeholder {
    color: rgb(155, 155, 167);
  }

  &:focus {
    outline: none;
    border-bottom: 0.09375rem solid rgb(82, 152, 255);
  }

  &:disabled {
    color: inherit;
    background-color: inherit;
  }
`

export const StyledButton = styled.button(
  ({ variant }: { variant?: 'secondary' | 'error' | 'success' }) => css`
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding: 0.875rem 1rem;
    border-radius: 0.75rem;
    font-size: 1.125rem;
    line-height: 1;
    font-weight: 600;
    transition: all 150ms ease-in-out;
    background: rgb(82, 152, 255);
    color: #fff;

    &:hover {
      cursor: pointer;
      filter: brightness(1.05);
      transform: translateY(-1px);
    }

    ${variant === 'secondary' &&
    css`
      background: rgba(82, 152, 255, 0.15);
      color: rgb(82, 152, 255);
    `}

    ${variant === 'error' &&
    css`
      background: rgb(213, 85, 85);
    `}

    ${variant === 'success' &&
    css`
      background: rgb(29, 175, 131);
    `}
  `
)
