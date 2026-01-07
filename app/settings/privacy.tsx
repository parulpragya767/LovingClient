import { EmbeddedWebPage } from '@/src/components/ui/EmbeddedWebPage';
import { LEGAL_URLS } from '@/src/constants/legalUrls';

export default function PrivacyScreen() {
  return <EmbeddedWebPage url={LEGAL_URLS.PRIVACY} />;
}
