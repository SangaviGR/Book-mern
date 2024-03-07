const Books = require("../models/BookCollection");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
//   // res.send("get all bootcamp route");
//   // // console.log(req.query);

//   // let query;

//   // let uiValues = {
//   //   filtering: {},
//   //   sorting: {},
//   // };

//   // const reqQuery = { ...req.query };

//   // const removeFields = ["sort"];//remove this as its not a query

//   // //console.log(reqQuery);

//   // removeFields.forEach((val) => delete reqQuery[val]); //if sort found remove it

//   // //console.log(reqQuery);

//   // let queryStr = JSON.stringify(reqQuery); //convert it to str

//   // //console.log(queryStr);

//   // // add $ to queryStr
//   // queryStr = queryStr.replace(
//   //   /\b(gt|gte|lt|lte|in)\b/g,
//   //   (match) => `$${match}`
//   // );

//   // //console.log(queryStr);

//   // const filterKeys = Object.keys(reqQuery);
//   // const filterValues = Object.values(reqQuery);

//   // // const bootcamps = await Bootcamp.find({price: {$lte:2000}});

//   // // const bootcamps = await Bootcamp.find(JSON.parse(queryStr));

//   // query = Bootcamp.find(JSON.parse(queryStr));

//   // if (req.query.sort) {
//   //   const sortByArr = req.query.sort.split(",");

//   //   sortByArr.forEach((val) => {
//   //     let order;

//   //     if (val[0] === "-") {
//   //       order = "descending";
//   //     } else {
//   //       order = "ascending";
//   //     }

//   //     uiValues.sorting[val.replace("-", "")] = order;
//   //   });

//   //   const sortByStr = sortByArr.join(" ");

//   //   query = query.sort(sortByStr);
//   // } else {
//   //   query = query.sort("-price");
//   // }

//   // const bootcamps = await query;

//   // const maxPrice = await Bootcamp.find()
//   //   .sort({ price: -1 })
//   //   .limit(1)
//   //   .select("-_id price");

//   // const minPrice = await Bootcamp.find()
//   //   .sort({ price: 1 })
//   //   .limit(1)
//   //   .select("-_id price");

//   // uiValues.maxPrice = maxPrice[0].price;
//   // uiValues.minPrice = minPrice[0].price;

//   // res.status(200).json({
//   //   success: true,
//   //   data: bootcamps,
//   //   uiValues,
//   // });

//   const books = await Books.find();
//   res.status(200).json({
//     success: true,
//     data: books
//   });

// });

exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude from query
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

  // Finding resource
  query = Books.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 3;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Books.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const books = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: books.length,
    pagination,
    data: books,
  });
});


exports.createNewBootcamp = asyncHandler(async (req, res, next) => {
  // res.send("create new bootcamp route");

  const books = await Books.create(req.body);
  res.status(201).json({
    success: true,
    data: books,
  });
});

exports.updateBootcampById = asyncHandler(async (req, res, next) => {
  // res.send("update bootcamp By Id");

  let books = await Books.findById(req.params.id);

  if (!books) {
    return next(
      new ErrorResponse(`Book with id ${req.params.id} was not found`, 404)
    );
  }

  books = await Books.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  
  res.status(201).json({
    success: true,
    data: books,
  });
});

exports.deleteBootcampById = asyncHandler(async (req, res, next) => {
  // res.send("delete bootcamp By Id");

  let books = await Books.findById(req.params.id);

  if (!books) {
    return next(
      new ErrorResponse(`Book with id ${req.params.id} was not found`, 404)
    );
  }

  await Books.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
