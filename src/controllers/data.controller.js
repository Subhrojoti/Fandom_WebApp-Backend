import { Media } from "../model/detailsData.model.js";
import { Data } from "../model/user.model.js";

const getMovies = async (req, res) => {
  try {
    let movies = await Data.find(
      { type: "Movie" },
      { trending: 0, popular: 0, __v: 0 }
    );
    return res.status(200).send({ movies });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const getTvSeries = async (req, res) => {
  try {
    let tvSeries = await Data.find(
      { type: "TV Series" },
      { trending: 0, popular: 0, __v: 0 }
    );
    return res.status(200).send({ tvSeries });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const getTrending = async (req, res) => {
  try {
    let trending = await Data.find(
      { trending: true },
      { trending: 0, popular: 0, __v: 0 }
    );
    return res.status(200).send({ trending });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
const getPopular = async (req, res) => {
  try {
    let popular = await Data.find(
      { popular: true },
      { trending: 0, popular: 0, __v: 0 }
    );
    return res.status(200).send({ popular });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
const getDetails = async (req, res) => {
  try {
    const { id, mediatype } = req.params;
    let capitalizeArr = [];
    if (mediatype === "movie") {
      capitalizeArr.push("Movie");
    } else if (mediatype === "tv") {
      capitalizeArr.push("TV Series");
    } else {
      capitalizeArr.push("unknown");
    }
    // console.log(id);
    // console.log(mediatype);
    // console.log(capitalizeArr);
    let details = await Media.find({ _id: id, type: capitalizeArr[0] });
    return res
      .status(200)
      .send(
        details.length === 0
          ? { details: "No matched Movie or TV Series was found" }
          : { details }
      );
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

export { getMovies, getTvSeries, getTrending, getPopular, getDetails };
