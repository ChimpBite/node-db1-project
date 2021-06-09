const Account = require('./accounts-model');

const router = require('express').Router();

const { checkAccountPayload, checkAccountId, checkAccountNameUnique } = require('./accounts-middleware');


router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.getAll();
    res.status(200).json(data);
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async(req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.getById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async(req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
});

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res,next ) => {
  try {
    const data = await Account.updateById(req.params.id, req.body)
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', checkAccountId, async(req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.deleteById(req.params.id)
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
