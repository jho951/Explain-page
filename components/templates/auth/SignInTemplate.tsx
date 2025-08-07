import React from 'react';

import { FormCard } from '@/components/molecules/card';

import SignInForm from '@/components/molecules/form/SignInForm';

import { FormTitle } from '@/components/molecules/FormTitle';
import { AuthTemplateProps } from '@/types/templates/auth';
import { SocialBtn } from '@/components/organisms/signin/SocialBtn';
import { LegalBtn } from '@/components/organisms/signin/LegalBtn';

import styles from '@/styles/features/SignIn.module.css';

export default function SignInTemplate({ title, desc, dividerText }: AuthTemplateProps) {
  return (
    <main className={styles.main}>
      <FormCard>
        <FormTitle title={title} desc={desc} icon="logo" size={70} />
        <SignInForm />
        <span className={styles.dividerText}>{dividerText}</span>
        <SocialBtn />
        <LegalBtn />
      </FormCard>
    </main>
  );
}
