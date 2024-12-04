"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertVersion = convertVersion;
exports.parseEnvContent = parseEnvContent;
function convertVersion(version) {
    const match = version.match(/\^(\d+)\.(\d+)/);
    if (match) {
        return `${match[1]}.*`;
    }
    return version;
}
function parseEnvContent(envContent) {
    const envVars = {};
    envContent.split('\n').forEach((line) => {
        const [key, value] = line.split('=');
        if (key && value !== undefined) {
            envVars[key.trim()] = value.trim();
        }
    });
    return envVars;
}
