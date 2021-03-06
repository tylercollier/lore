var blueprints = {
  find: require('./blueprints/find'),
  byId: require('./blueprints/byId'),
  byCid: require('./blueprints/byCid')
};

module.exports = function(modelName) {
  var find = blueprints.find(modelName);
  var byId = blueprints.byId(modelName);
  var byCid = blueprints.byCid(modelName);

  var initialState = {
    find: undefined,
    byId: undefined,
    byCid: undefined
  };

  return function (state, action) {
    state = state || initialState;

    var _byId = byId(state.byId, action);
    var _byCid = byCid(state.byCid, action);
    var _find = find(state.find, action, {
      nextState: {
        byId: _byId,
        byCid: _byCid
      }
    });

    return {
      find: _find,
      byId: _byId,
      byCid: _byCid
    };
  };
};
