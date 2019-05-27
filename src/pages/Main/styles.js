import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`;

export const Form = styled.form`
  margin-top: 30px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;

  div.container-input {
    margin-bottom: 5px;

    input {
      flex: 1;
      width: 50%;
      height: 45px;
      padding: 0 20px;
      background-color: #fff;
      font-size: 14px;
      color: #444;
      border-radius: 3px;
      border: ${props => (props.error ? '2px solid #f00' : 0)};

      &:nth-child(2n) {
        border-radius: 0 3px 3px 0;
        border-left-width: 0;
      }

      &:nth-child(2n - 1) {
        border-radius: 3px 0 0 3px;
        border-right: 1px solid #ddd;
      }
    }
  }

  button {
    width: 100%;
    height: 40px;
    padding: 0 20px;
    background-color: #63f5b8;
    border: 0;
    font-size: 16px;
    color: #fff;
    border-radius: 3px;
    font-weight: bold;

    &:hover {
      background-color: #52d89f;
    }
  }
`;
