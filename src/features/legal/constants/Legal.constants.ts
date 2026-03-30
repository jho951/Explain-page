interface LegalDocument {
  title: string;
  content: string;
}

const legalDocuments: Record<string, LegalDocument> = {
  privacy: {
    title: 'Privacy',
    content:
      'We explain what personal data is collected, why it is processed, and how long it is retained for service operation.',
  },
  terms: {
    title: 'Terms',
    content:
      'These terms define account usage rules, service scope, user responsibilities, and limits of liability.',
  },
  security: {
    title: 'Security',
    content:
      'We outline authentication controls, access policies, and operational safeguards used to protect workspace and document data.',
  },
  esg: {
    title: 'ESG',
    content:
      'This section summarizes our approach to environmental sustainability, social responsibility, and governance practices.',
  },
  'responsible-disclosure': {
    title: 'Responsible Disclosure',
    content:
      'If you discover a vulnerability, report it responsibly through the defined channel so we can investigate and remediate safely.',
  },
  'privacy-policy': {
    title: 'Privacy',
    content:
      'We explain what personal data is collected, why it is processed, and how long it is retained for service operation.',
  },
};

export { legalDocuments };
