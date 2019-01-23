import { Registry } from '@bem-react/di';
import { Example, cnExample } from '../../Example/Example@touch';

export const touch = new Registry({ id: 'platform' });

touch.set(cnExample(), Example);
