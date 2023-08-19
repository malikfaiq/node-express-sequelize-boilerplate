const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { authService, userService, tokenService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send({user});
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginUserWithUsernameAndPassword(username, password);
  // const user = await userService.getUserByUsername(username);
  const token = jwt.sign({ userId: user.id }, 'testingkey', { expiresIn: '1h' });
  res.send({ user, token });
});


module.exports = {
    register,
    login,
  };