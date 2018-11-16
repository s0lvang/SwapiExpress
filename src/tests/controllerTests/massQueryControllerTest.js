import assert from 'assert';
import { expect } from 'chai';

import {
  getIdentifier,
  paginateModel,
  orderedSort,
  sortModel,
  processModel,
} from '../../controllers/massQueryController';

const identifierName = { id: 1, name: 'gotName' };
const identifierTitle = { id: 2, title: 'gotTitle' };
const identifierTransportName = { id: 3, Transport: { name: 'gotTransportName' } };
const paginatedMockBody = { page: 1, limit: 2 };
const paginatedMockModels = { search: 'Testing', rows: [1, 2, 3, 4, 5, 6] };
const unSortedModel = { search: 'Testing', rows: [{ name: 1 }, { name: 3 }, { name: 8 }, { name: 2 }, { name: 5 }, { name: 6 }] };
const sortedRowsDesc = [
  { name: 8 }, { name: 6 }, { name: 5 }, { name: 3 }, { name: 2 }, { name: 1 }
];
const sortedRowsAsc = [
  { name: 1 }, { name: 2 }, { name: 3 }, { name: 5 }, { name: 6 }, { name: 8 }
];
const low = 1;
const high = 2;
const orderASC = 'ASC';
const orderDESC = 'DESC';

describe('Mass Query Controller', () => {
  describe('Identifier tests', () => {
    it('getIdentifier should return the name attribute', () => {
      const identifier = getIdentifier(identifierName);
      const nameAttribute = identifierName.name;
      assert.equal(identifier, nameAttribute);
    });

    it('getIdentifier should return the title attribute', () => {
      const identifier = getIdentifier(identifierTitle);
      const titleAttribute = identifierTitle.title;
      assert.equal(identifier, titleAttribute);
    });

    it('getIdentifier should return the transport object\'s name attribute', () => {
      const identifier = getIdentifier(identifierTransportName);
      const transportNameAttribute = identifierTransportName.Transport.name;
      assert.equal(identifier, transportNameAttribute);
    });
  });

  describe('Paginated Model tests', () => {
    it('Search attribute should be untouched', () => {
      const model = paginateModel(paginatedMockBody, paginatedMockModels);
      assert.equal(model.search, paginatedMockModels.search);
    });

    it('The first two rows are the only ones', () => {
      const model = paginateModel(paginatedMockBody, paginatedMockModels);
      const rows = [1, 2];
      expect(model.rows).to.have.members(rows);
    });
  });

  describe('Ordered Sort test', () => {
    it('if ASC and first value is lower, return -1', () => {
      const highValue = orderedSort(low, high, orderASC);
      assert.equal(highValue, -1);
    });
    
    it('if DESC and first value is lower, return 1', () => {
      const lowValue = orderedSort(low, high, orderDESC);
      assert.equal(lowValue, 1);
    });

    it('if DESC and first value is higher, return 1', () => {
      const highValue = orderedSort(high, low, orderDESC);
      assert.equal(highValue, -1);
    });
    
    it('if ASC and first value is higher, return 1', () => {
      const lowValue = orderedSort(high, low, orderASC);
      assert.equal(lowValue, 1);
    });

    it('Should be sorted alphabeticallty', () => {
      const numOne = 1;
      const numTwo = 1;
      const order = 'ASC';
      const equalTestOne = orderedSort(numOne, numTwo, order);
      const equalTestTwo = orderedSort(numTwo, numOne, order);
      assert.equal(equalTestOne, 0);
      assert.equal(equalTestTwo, 0);
    });
  });

  describe('Sort Model tests', () => {
    it('Sort the rows in the model from lowest to highest', () => {
      const sortedModel = sortModel({ order: orderDESC }, unSortedModel);
      expect(sortedModel.rows).to.eql(sortedRowsDesc);
    });

    it('Sort the rows in the model from highest to lowest', () => {
      const sortedModel = sortModel({ order: orderASC }, unSortedModel);
      expect(sortedModel.rows).to.eql(sortedRowsAsc);
    });
  });
});
