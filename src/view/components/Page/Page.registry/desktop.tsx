import { Registry } from '@bem-react/di';
import { Example, cnExample } from '../../Example/Example@desktop';

export const desktop = new Registry({ id: 'platform' });

desktop.set(cnExample(), Example);
