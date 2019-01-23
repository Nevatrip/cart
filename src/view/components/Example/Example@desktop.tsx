import * as React from 'react';
import { cn } from '@bem-react/classname';
import * as Common from './Example';
import './Example@desktop.css';

export const cnExample = cn('Example');

export class Example extends Common.Example {
  constructor(props: Common.IExampleProps) {
    super(props);
  }

  render() {
    return (
      <div className={cnExample()}>
        Desktop
      </div>
    )
  }
}
