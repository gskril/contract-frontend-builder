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

  &::after {
    content: '';
    position: absolute;
    right: 2.3125rem;
    bottom: 0.75rem;
    width: 5rem;
    height: 2.1725rem;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgb(255, 255, 255)
    );
    pointer-events: none;
  }
`

export const Label = styled.label`
  font-size: 0.9375rem;
  font-weight: 400;
  color: rgb(155, 155, 167);
  text-align: left;
`

export const StyledInput = styled.input`
  position: relative;
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 1;
  width: 100%;
  border: none;
  padding-bottom: 0.125rem;
  padding-right: 1.3125rem;
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
  ({ tone, variant }: { tone?: 'green' | 'red'; variant?: 'secondary' }) => css`
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
    background-color: rgb(82, 152, 255);
    color: #fff;

    &:hover {
      cursor: pointer;
      filter: brightness(1.05);
      transform: translateY(-1px);
    }

    &:disabled {
      cursor: not-allowed;
    }

    ${tone === 'red' &&
    css`
      background-color: rgb(213, 85, 85);
    `}

    ${tone === 'green' &&
    css`
      background-color: rgb(29, 175, 131);
    `}

    ${variant === 'secondary' &&
    css`
      background-color: rgba(82, 152, 255, 0.15);
      color: rgb(82, 152, 255);

      ${tone === 'red' &&
      css`
        background-color: rgb(249, 231, 231);
        color: rgb(197, 47, 27);

        &:hover {
          background-color: rgb(240, 194, 194);
        }
      `}

      ${tone === 'green' &&
      css`
        background-color: rgb(231, 244, 239);
        color: rgb(29, 175, 131);

        &:hover {
          background-color: rgb(203, 231, 220);
        }
      `}
    `}
  `
)

export const ValidationIconWrapper = styled.div(
  ({ isValid }: { isValid: boolean }) => css`
    display: flex;
    padding: 0.1875rem;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 1rem;
    bottom: 1.25rem;
    width: 1rem;
    height: 1rem;
    border-radius: 10rem;
    background-color: ${isValid ? 'green' : 'red'};
    color: #fff;
    z-index: 100;
    transition: background-color 0.1s ease-in-out;
  `
)
