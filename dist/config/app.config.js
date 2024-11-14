"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
class AppConfig {
    constructor() {
        this.name = process.env.APP_NAME || 'Project';
        this.port = Number(process.env.SV_PORT || 8000);
        this.host = process.env.APP_HOST || 'localhost';
        this.expiredStaticFiles = process.env.APP_EXPIRED_STATIC_FILES || '31557600000';
        this.sessionKey = process.env.SESSION_KEY;
        this.sessionMaxAge = Number(process.env.SESSION_MAX_AGE);
        this.baseURL = process.env.BASE_URL || 'http://localhost:3000';
    }
}
exports.default = AppConfig;
//# sourceMappingURL=app.config.js.map