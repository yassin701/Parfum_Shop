import { useLocale } from 'next-intl';

export default function useDirection() {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  return {
    dir: isRtl ? 'rtl' : 'ltr',
    isRtl,
    multiplier: isRtl ? -1 : 1, // for x transforms (100 * multiplier)
  };
}
