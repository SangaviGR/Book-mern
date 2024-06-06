import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Pagination, Button, TextField } from '@mui/material';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`/api/v1/books?page=${page}`);
        setBooks(response.data.data);
        setTotalPages(Math.ceil(response.data.total / response.data.pagination.limit));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBooks();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleUpdate = async (bookId, updatedBook) => {
    try {
      await axios.put(`/api/v1/books/${bookId}`, updatedBook);
      // Refresh the books after updating
      const response = await axios.get(`/api/v1/books?page=${page}`);
      setBooks(response.data.data);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      <h1>Books</h1>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item key={book._id} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                {book.isEditing ? (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate(book._id, {
                      title: e.target.title.value,
                      author: e.target.author.value,
                      pdfLink: e.target.pdfLink.value,
                      imageUrl: e.target.imageUrl.value,
                      description: e.target.description.value,
                      rating: e.target.rating.value,
                      price: e.target.price.value,
                      genre: e.target.genre.value,
                    });
                    // Set isEditing back to false after updating
                    const updatedBooks = books.map((b) =>
                      b._id === book._id ? { ...b, isEditing: false } : b
                    );
                    setBooks(updatedBooks);
                  }}>
                    <TextField name="title" label="Title" defaultValue={book.title} />
                    <TextField name="author" label="Author" defaultValue={book.author} />
                    <TextField name="pdfLink" label="PDF Link" defaultValue={book.pdfLink} />
                    <TextField name="imageUrl" label="Image URL" defaultValue={book.imageUrl} />
                    <TextField name="description" label="Description" defaultValue={book.description} />
                    <TextField name="rating" label="Rating" defaultValue={book.rating} />
                    <TextField name="price" label="Price" defaultValue={book.price} />
                    <TextField name="genre" label="Genre" defaultValue={book.genre} />
                    <Button type="submit">Save</Button>
                  </form>
                ) : (
                  <>
                    <Typography gutterBottom variant="h5" component="div">
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Author: {book.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description: {book.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rating: {book.rating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: {book.price}
                    </Typography>
                    <Button onClick={() => {
                      const updatedBooks = books.map((b) =>
                        b._id === book._id ? { ...b, isEditing: true } : b
                      );
                      setBooks(updatedBooks);
                    }}>Edit</Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
      />
    </div>
  );
};

export default BooksPage;
