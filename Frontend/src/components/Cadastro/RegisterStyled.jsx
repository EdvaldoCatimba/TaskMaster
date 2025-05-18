import styled, {keyframes} from 'styled-components';


const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;


export const RegisterStyled = styled.div`
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;



  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
       margin-top: 50px;
  }

  .logo img {
    width: 200px;
    animation: ${float} 3s ease-in-out infinite;
  }
  .content-form {
    background-color: white;
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    border-radius: 20px;
    box-shadow: 0 8px 100px rgba(196, 217, 252, 0.8);
    margin-bottom: 50px;
  }

  .content-form p {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
  }

  .control {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .cont-email, .cont-senha {
    display: flex;
    gap: 5px;
    align-items: center;
    border: 1px solid #c3c3c4;
    padding: 10px;
    border-radius: 10px;
  }

  .cont-email:focus-within,
  .cont-senha:focus-within {
    border: 1px solid #C4D9FC;
    box-shadow: 0 8px 100px rgba(196, 217, 252, 0.8);
  }

  input {
    padding: 10px;
    border: none;
    outline: none;
    flex: 1;
  }

  .btn-entrar {
    padding: 10px;
    border: none;
    color: white;
    background-color: #1D4ED8;
    border-radius: 10px;
    cursor: pointer;
  }
  .sms{
    align-self: center;
    text-align: center;
  }

  .link{
    margin: 20px 0;
    font-size: 1em;
  }
  .link a{
    color: #1D4ED8;
  }






  
  /* Responsividade */
  @media (max-width: 1024px) {
    .content-form {
      width: 50%;
      height: auto;
    }
  }

  @media (max-width: 768px) {
    .content-form {
      width: 80%;
      padding: 20px;
    }
    .logo img {
      width: 150px;
    }
  }

  @media (max-width: 480px) {
    .content-form {
      width: 95%;
      padding: 15px;
    }
    .content-form p {
      font-size: 1.1rem;
    }
    .logo img {
      width: 120px;
    }
  }
`;
