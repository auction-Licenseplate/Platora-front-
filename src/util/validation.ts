//  유효성 검사 함수
const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email) ? "" : "유효한 이메일을 입력해주세요";
};

export { validateEmail };
