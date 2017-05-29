const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const expect = require('chai').expect;
const app = require('../../../index');

chai.config.includeStack = true;

describe('## User APIs', () => {
    it('should pass this canary test',function() {
        expect(true).to.be.true;
    });

});
