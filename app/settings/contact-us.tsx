import { EmbeddedWebPage } from '@/src/components/ui/EmbeddedWebPage';
import { LEGAL_URLS } from '@/src/constants/legalUrls';

export default function ContactUsScreen() {
  return <EmbeddedWebPage url={LEGAL_URLS.CONTACT} />;
}
