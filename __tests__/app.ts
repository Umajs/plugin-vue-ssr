import * as path from 'path';
import * as shell from "shelljs";
import Uma from '@umajs/core';
import { Router } from '@umajs/router';

const pluginDir = path.resolve(__dirname, './plugins');
shell.rm(pluginDir);
shell.mkdir(pluginDir);
shell.ln('-sf', path.resolve(__dirname, '../src'), path.resolve(__dirname, './plugins/vue-ssr'));

const uma = Uma.instance({
    Router,
    bodyParser: { multipart: true },
    ROOT: __dirname,
    env: process.argv.indexOf('production') > -1 ? 'production' : 'development',
});

uma.start(8058);
