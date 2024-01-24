import { name, version } from '../../package.json';

export const Constants = {
    app: {
        port: process.env.PORT,
        name,
        version,
    },
}
