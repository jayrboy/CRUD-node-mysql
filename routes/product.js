import express from 'express'
import { connection as conn } from '../mysql.js'

const router = express.Router()

//TODO: READ
router.get('/read', async (req, res) => {
  conn.query('SELECT * FROM products', (err, result) => {
    if (err) {
      console.log('failed get product', err)
      return
    }
    res.json(result)
  })
})

//TODO: READ_ID
router.get('/read/:id', async (req, res) => {
  const id = req.params.id

  conn.query('SELECT * FROM products WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.log('failed get product_id', err)
      return
    }
    res.json(result)
  })
})

//TODO: CREATE
router.post('/create', async (req, res) => {
  const { name, price, shopping } = req.body

  if (!name || !price || !shopping) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  conn.query(
    `INSERT INTO products(name, price, shopping) VALUES(?, ?, ?)`,
    [name, price, shopping],
    (err, result) => {
      // const id = result.insertId
      res.json({ id: result.insertId, name, price, shopping })
    }
  )
})

//TODO: DELETE
router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({ error: 'Missing ID' })
  }

  conn.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.log('failed to delete product', err)
      return res.status(500).json({ error: 'Failed to delete product' })
    }

    console.log('deleted product_id successfully')
    res.json({ message: 'Product deleted successfully' })
  })
})

//TODO: UPDATE
router.put('/update/:id', async (req, res) => {
  const id = req.params.id
  const { name, price, shopping } = req.body

  if (!id || !name || !price || !shopping) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  conn.query(
    'UPDATE products SET name=?, price=?, shopping=? WHERE id=?',
    [name, price, shopping, id],
    (err, result) => {
      if (err) {
        console.error('Failed to update product:', err)
        return res.status(500).json({ error: 'Failed to update product' })
      }
      console.log('Updated product successfully')
      res.json({ message: 'Product updated successfully' })
    }
  )
})

export default router
