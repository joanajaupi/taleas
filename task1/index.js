const express = require('express');
const { Pool } = require('pg');

// Create an instance of Express app
const app = express();

// Set up the PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'postgres',
  port: 5432
});

// Middleware to parse JSON requests
app.use(express.json());


// Get all categories
app.get('/categories', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM category');
    res.json(rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new category
app.post('/categories', async (req, res) => {
  const { categoryName } = req.body;

  try {
    const { rows } = await pool.query(
      'INSERT INTO category (id, categoryName) VALUES (uuid_generate_v4(), $1) RETURNING *',
      [categoryName]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a specific category by ID
app.put('/categories/:id', async (req, res) => {
    const categoryId = req.params.id;
    const { categoryName } = req.body;
  
    try {
      const { rows } = await pool.query(
        'UPDATE category SET categoryName = $1 WHERE id = $2 RETURNING *',
        [categoryName, categoryId]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.json(rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Delete a specific category by ID
  app.delete('/categories/:id', async (req, res) => {
    const categoryId = req.params.id;
  
    try {
      const { rows } = await pool.query('DELETE FROM category WHERE id = $1 RETURNING *', [categoryId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/categories/:id', async (req, res) => {
    const categoryId = req.params.id;
  
    try {
      const { rows } = await pool.query('SELECT * FROM category WHERE id = $1', [categoryId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.json(rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });  

// Get all products
app.get('/products', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT p.id, p.productName, p.price, c.categoryName, p.createdOn FROM product p LEFT JOIN category c ON p.categoryId = c.id');
    res.json(rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new product
app.post('/products', async (req, res) => {
  const { productName, price, categoryId } = req.body;

  try {
    const { rows } = await pool.query(
      'INSERT INTO product (id, productName, price, categoryId, createdOn) VALUES (uuid_generate_v4(), $1, $2, $3, current_timestamp) RETURNING *',
      [productName, price, categoryId]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Update a specific category by ID
app.put('/categories/:id', async (req, res) => {
    const categoryId = req.params.id;
    const { categoryName } = req.body;
  
    try {
      const { rows } = await pool.query(
        'UPDATE category SET categoryName = $1 WHERE id = $2 RETURNING *',
        [categoryName, categoryId]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.json(rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Delete a specific category by ID
  app.delete('/categories/:id', async (req, res) => {
    const categoryId = req.params.id;
  
    try {
      const { rows } = await pool.query('DELETE FROM category WHERE id = $1 RETURNING *', [categoryId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Get a specific product by ID
  app.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
  
    try {
      const { rows } = await pool.query('SELECT p.id, p.productName, p.price, c.categoryName, p.createdOn FROM product p LEFT JOIN category c ON p.categoryId = c.id WHERE p.id = $1', [productId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Update a specific product by ID
app.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const { productName, price, categoryId } = req.body;
  
    try {
      const { rows } = await pool.query(
        'UPDATE product SET productName = $1, price = $2, categoryId = $3 WHERE id = $4 RETURNING *',
        [productName, price, categoryId, productId]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Delete a specific product by ID
  app.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;
  
    try {
      const { rows } = await pool.query('DELETE FROM product WHERE id = $1 RETURNING *', [productId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
