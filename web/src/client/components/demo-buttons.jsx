import React from 'react';

import custom from '../styles/custom.css';
import {Button} from 'semantic-ui-react'
/*
 * Demostrates a simple pure functional component
 */

export const DemoButtons = () =>
  (<div>
    <h6 className={custom['docs-header']}>
      demo CSS modules with buttons from <a href="http://getskeleton.com/">skeleton</a>
    </h6>
    <div className={custom['docs-example']}>
      <Button as="a" href="#">Anchor button</Button>
      <Button>Button element</Button>
      <input type="submit" value="submit input" />
      <input type="button" value="button input" />
    </div>
    <div className={custom['docs-example']}>

      <Button>Button element</Button>

    </div>
  </div>);
