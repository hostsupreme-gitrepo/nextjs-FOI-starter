'use strict';

/**
 * foi service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::foi.foi');
