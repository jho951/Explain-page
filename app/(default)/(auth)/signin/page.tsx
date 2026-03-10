import SignInTemplate from '@/components/templates/auth/SignInTemplate';

function SignInPage() {
  return (
    <SignInTemplate
      title="SB에 오신 것을 환영합니다"
      desc="로그인 또는 가입하시려면 이메일을 입력해주세요."
      dividerText="또는"
    />
  );
}

export default SignInPage;
