import { Injectable } from '@angular/core';
import * as Uppy from '@uppy/core';

@Injectable()
export class UppyService{
    readonly uppy = Uppy;

    addPlugin = (uppy: any, [name, conf]: [string, any]) => uppy.use(name, conf);

    configure(pluginConfig, uuid):any {

    }

}
