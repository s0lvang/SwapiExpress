import { Op } from "sequelize";
import assert from "assert";
import searchQuery from "../utils/searchQuery";

describe("SearchQuery", () => {
  it("multiple searchterm should be rendered correctly", () => {
    const expectedQuery = [
      { name: { [Op.iLike]: "%Luke Skywalker%" } },
      { classification: { [Op.iLike]: "%Luke Skywalker%" } },
      { designation: { [Op.iLike]: "%Luke Skywalker%" } },
      { language: { [Op.iLike]: "%Luke Skywalker%" } }
    ];
    const query = searchQuery("Luke Skywalker", [
      "name",
      "classification",
      "designation",
      "language"
    ]);
    assert.equal(JSON.stringify(expectedQuery), JSON.stringify(query));
  });
  
  it("single searchterm should be rendered correctly", () => {
    const expectedQuery = [
      { name: { [Op.iLike]: "%The senate%" } },
    ];
    const query = searchQuery("The senate", [
      "name",
    ]);
    assert.equal(JSON.stringify(expectedQuery), JSON.stringify(query));
  });
});
