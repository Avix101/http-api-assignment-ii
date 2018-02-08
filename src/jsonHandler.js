const users = {};

const respond = (meta, req, res, statusCode, JSONdata) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });

  if (meta) {
    res.end();
    return;
  }

  res.write(JSON.stringify(JSONdata));
  res.end();
};

const getUsers = (req, res) => {
  const response = { users };
  respond(false, req, res, 200, response);
};

const getUsersMeta = (req, res) => {
  respond(true, req, res, 200);
};

const getNonExistant = (req, res) => {
  const response = {
    id: 'nonExistant',
    message: 'The requested resource could not be found',
  };
  respond(false, req, res, 404, response);
};

const getNonExistantMeta = (req, res) => {
  respond(true, req, res, 404);
};

const addUser = (req, res, params) => {
  if (!params.name || !params.age) {
    const response = {
      id: 'missingParameters',
      message: 'Both name and age are required parameters',
    };
    respond(false, req, res, 400, response);
    return;
  }

  if (users[params.name]) {
    users[params.name].name = params.name;
    users[params.name].age = params.age;
    respond(true, req, res, 204);
  } else {
    users[params.name] = {
      name: params.name,
      age: params.age,
    };

    const response = {
      message: 'Created Successfully',
    };

    respond(false, req, res, 201, response);
  }
};

module.exports = {
  getUsers,
  getUsersMeta,
  getNonExistant,
  getNonExistantMeta,
  addUser,
};
