const router = require('express').Router()

const MovieController = require('../controllers/MovieController')
const upload = require('../middleware/multer')
const multipleUpload = upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'screenshots' }])

router.get('/', MovieController.getAll)

router.get('/add', MovieController.getAdd)
router.post('/add', multipleUpload, MovieController.postAdd)

router.get('/:id/edit', MovieController.getEdit)
router.post('/:id/edit', multipleUpload, MovieController.postEdit)

router.get('/:id/view', MovieController.getView)
router.get('/:id/delete', MovieController.getDelete)

module.exports = router
