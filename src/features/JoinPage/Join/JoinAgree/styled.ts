import styled from "styled-components";

export const JoinAgreeStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  .joinagree-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .joinagree-checklist {
    width: 100%;
    max-width: 550px;
    max-height: 400px;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow-y: auto;
    background-color: #f9f9f9;
    font-size: 0.9rem;
    color: #333;
    line-height: 1.5;
  }

  .joinagree-checklist ul {
    padding-left: 1rem;
  }

  .joinagree-checklist li {
    margin-bottom: 0.5rem;
  }

  .joinagree-check {
    font-weight: 500;
    font-size: 1rem;
    margin-top: 0.5rem;
  }
`;
