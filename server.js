const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const PORT = 5500;

app.put('/update-movies', (req, res) => {
  // Read the existing movies.json file
  fs.readFile('movies.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Error reading movies.json' });
      return;
    }

    const newData = JSON.parse(data);

    // Update the data based on the request body
    const { newMoviesData } = req.body;

    newData.green = newMoviesData.green;
    newData.yellow = newMoviesData.yellow;
    newData.red = newMoviesData.red;

    // Write the updated data back to movies.json

    fs.writeFile('movies.json', JSON.stringify(newData, null, 2), err => {
      if (err) {
        res.status(500).json({ error: 'Error writing to movies.json' });
        return;
      }

      res.json({ message: 'Movies data updated successfully' });
    });
    console.log('Successfully updated!')
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
