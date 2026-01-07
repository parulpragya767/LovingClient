import { EmbeddedWebPage } from '@/src/components/ui/EmbeddedWebPage';
import { LEGAL_URLS } from '@/src/constants/legalUrls';

export default function TermsScreen() {
  return <EmbeddedWebPage url={LEGAL_URLS.TERMS} />;
}
