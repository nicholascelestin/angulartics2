import { Injectable } from '@angular/core';

import { Angulartics2 } from '../../core/angulartics2';


declare var woopra: any;

@Injectable()
export class Angulartics2Woopra {

  constructor(private angulartics2: Angulartics2) {
    if (typeof (woopra) === 'undefined') {
      console.warn('Woopra not found');
    }

    this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path, x.location));

    this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

    this.angulartics2.setUserProperties.subscribe((x: any) => this.setUserProperties(x));


  }

  pageTrack(path: string, location: any) {
    try {
      woopra.track('pv', {
        url: path
      });
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }


  eventTrack(action: string, properties: any) {
    try {
      woopra.track(action, properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUserProperties(properties: any) {
    try {
      if (properties.email) {
        woopra.identify(properties);
      }
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }
}