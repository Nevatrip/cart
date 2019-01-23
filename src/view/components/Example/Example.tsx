import * as React from 'react';
import { cn } from '@bem-react/classname';
import { RegistryConsumer } from '@bem-react/di';

import './Example.css';

export const cnExample = cn('Example');

export interface IExampleProps {
  myProp: string;
}

interface IExampleState {
  myState: string;
}

export class Example extends React.Component<IExampleProps, IExampleState> {
  constructor(props: IExampleProps) {
    super(props);

    this.state = {
      myState: 'foo',
    };
  }

  render() {
    const { myState } = this.state;

    return (
      <RegistryConsumer>
        {registries => {
          return (
            <div className={cnExample()}>
              <header className={cnExample('Header')}>
                Example's header
              </header>
              <main className={cnExample('Content')}>
                Example's content
              </main>
            </div>
          )
        }}
      </RegistryConsumer>
    );
  }
}
