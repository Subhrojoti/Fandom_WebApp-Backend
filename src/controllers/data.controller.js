import { Media } from "../model/detailsData.model.js"; // Importing the Media model
import { Data } from "../model/user.model.js"; // Importing the Data model

// Get all movies
const getMovies = async (req, res) => {
  try {
    let movies = await Data.find(
      { type: "Movie" }, // Finding documents with type "Movie"
      { trending: 0, popular: 0, __v: 0 } // Excluding fields: trending, popular, and __v
    );
    return res.status(200).send({ movies }); // Sending success response with movies data
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" }); // Sending error response
  }
};

// Get all TV series
const getTvSeries = async (req, res) => {
  try {
    let tvSeries = await Data.find(
      { type: "TV Series" }, // Finding documents with type "TV Series"
      { trending: 0, popular: 0, __v: 0 } // Excluding fields: trending, popular, and __v
    );
    return res.status(200).send({ tvSeries }); // Sending success response with TV series data
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" }); // Sending error response
  }
};

// Get all trending media
const getTrending = async (req, res) => {
  try {
    let trending = await Data.find(
      { trending: true }, // Finding documents with trending set to true
      { trending: 0, popular: 0, __v: 0 } // Excluding fields: trending, popular, and __v
    );
    return res.status(200).send({ trending }); // Sending success response with trending data
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" }); // Sending error response
  }
};

// Get all popular media
const getPopular = async (req, res) => {
  try {
    let popular = await Data.find(
      { popular: true }, // Finding documents with popular set to true
      { trending: 0, popular: 0, __v: 0 } // Excluding fields: trending, popular, and __v
    );
    return res.status(200).send({ popular }); // Sending success response with popular data
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" }); // Sending error response
  }
};

// Get details of a specific media item
const getDetails = async (req, res) => {
  try {
    const { id, mediatype } = req.params; // Extracting id and mediatype from request parameters
    let capitalizeArr = [];
    if (mediatype === "movie") {
      capitalizeArr.push("Movie"); // Adding "Movie" to capitalizeArr if mediatype is "movie"
    } else if (mediatype === "tv") {
      capitalizeArr.push("TV Series"); // Adding "TV Series" to capitalizeArr if mediatype is "tv"
    } else {
      capitalizeArr.push("unknown"); // Adding "unknown" to capitalizeArr if mediatype is not recognized
    }

    // Finding the media item by id and type
    let details = await Media.find({ _id: id, type: capitalizeArr[0] });
    return res.status(200).send(
      details.length === 0
        ? { details: "No matched Movie or TV Series was found" } // Sending message if no match found
        : { details } // Sending details if match found
    );
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" }); // Sending error response
  }
};

export { getMovies, getTvSeries, getTrending, getPopular, getDetails }; // Exporting the functions
