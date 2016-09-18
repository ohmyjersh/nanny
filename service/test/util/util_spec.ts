///<reference path="../../typings/index.d.ts"/>
import { expect } from 'chai';
import utils from '../../src/utils/util';

describe('it should run utils', ()=> {
    it('should return false', () => {
        expect(utils.isNullOrUndefined("value")).to.be.equal(true);
    });
    it('should return true', () => {
        expect(utils.isNullOrUndefined(undefined)).to.be.equal(true);
    });
    it('should return true', () => {
        expect(utils.isNullOrUndefined(null)).to.be.equal(true);
    }); 
})